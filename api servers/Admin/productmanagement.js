const functions = require('../functions/scripts')
const express = require('express')

const pool = functions.pool
const app = functions.app
const checkTokenExpiry = functions.checkTokenExpiry
const checkUserRole = functions.checkUserRole
const bearer = functions.bearer
const itemsPerPage = functions.itemsPerPage

function deleteProduct(prodId, res) {
    pool.query('DELETE FROM prods WHERE prodId = ?', [prodId], (error, result) => {
        if (error) {
            console.error('Error deleting product:', error);
            res.status(500).send('Internal Server Error');
        } else {
            pool.query('UPDATE prods WHERE prodId = ?', [prodId], (error, result) => { })

            deleteProductImages(prodId, res);
        }
    });
}

function deleteProductImages(prodId, res) {
    pool.query('SELECT imageUrl FROM productimages WHERE prodId = ?', [prodId], (error, results) => {
        if (error) {
            console.error('Error retrieving product images:', error);
            res.status(500).send('Internal Server Error');
        } else {
            results.forEach((image) => {
                const urlParts = image.imageUrl.split('/');

                const imagePath = path.join('D:', 'productapi', 'uploads', prodId, urlParts[3]);

                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error('Error deleting image file:', err);
                    } else {
                        console.log(`Deleted image file: ${imagePath}`);
                    }
                });
            });

            pool.query('DELETE FROM productimages WHERE prodId = ?', [prodId], (deleteError, deleteResults) => {
                if (deleteError) {
                    res.status(500).send('Internal Server Error');
                } else {
                    res.status(200).send(`Deleted ${deleteResults.affectedRows} images for prodId: ${prodId}`);
                }
            });
        }
    });
}

app.use(express.json());


app.post('/addProds', bearer, (req, res) => {
    const user = req.headers.loggedinuser
    const { prodName, prodLocation, prodLocation1, prodLocation2, status, prodTitle, prodSubTitle, prodShortDescription, prodDescription, prodType, prodCategory, prodSubCategory, cost, quantity, quantityType } = req.body;
    checkTokenExpiry(req, res, () => {
        pool.query('SELECT * from adminuser where userId = ?', [user], (error, result) => {
            if (error) {
                res.status(500).json({ error: 'Internal Server Error' });
            }
            let prodId
            const user = result[0].userId
            let createddate, updateddate
            createddate = Date.now()
            updateddate = Date.now()

            pool.query('SELECT MAX(prodId) as last FROM prods', (e, r) => {
                if (r[0].last === null) {
                    prodId = 10000

                } else {
                    prodId = r[0].last++ + 1;

                }
                const productTable = { prodId, prodName, prodLocation, prodLocation1, prodLocation2, status, prodTitle, prodSubTitle, prodShortDescription, prodDescription, prodType, prodCategory, prodSubCategory, cost, quantity, quantityType, user, createddate, updateddate };

                pool.query('INSERT INTO prods SET ?', productTable, (error, result) => {
                    if (error) {
                        res.status(500).json({ error: 'Internal Server Error' });
                    } else {
                        res.status(201).json({ message: 'Product created successfully', prodId });
                    }
                })
            });
        });
    })
})

app.put('/updateProds/:id', bearer, (req, res, next) => {
    const prodId = req.params.id;
    const loggedInUser = req.headers.loggedinuser;
    const { prodName, prodLocation, prodLocation1, prodLocation2, status, prodTitle, prodSubTitle, prodShortDescription, prodDescription, prodType, prodCategory, prodSubCategory, cost, quantity, quantityType } = req.body;
    const updatedBy = loggedInUser;
    const updateddate = Date.now();


    const productTable = {
        prodId, prodName, prodLocation, prodLocation1, prodLocation2, status, prodTitle, prodSubTitle, prodShortDescription, prodDescription, prodType, prodCategory, prodSubCategory, cost, quantity, quantityType, updateddate,
        updatedBy
    };


    checkTokenExpiry(req, res, () => {
        pool.query('SELECT role FROM adminuser WHERE userId = ?', [loggedInUser], (error, result) => {
            if (error) {
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            if (result.length > 0 && result[0].role === 69) {
                pool.query(
                    'UPDATE prods SET ? WHERE prodId = ?',
                    [productTable, prodId],
                    (error, result) => {
                        if (error) {
                            console.error('Error updating user:', error);
                            res.status(500).send('Internal Server Error');
                        } else {
                            res.status(200).send({ message: 'Product updated successfully' });
                        }
                    }
                );
            } else {
                pool.query('SELECT prodId FROM prods WHERE user = ? AND prodId = ?', [loggedInUser, prodId], (error, result) => {
                    if (error) {

                        res.status(500).json({ error: 'Internal Server Error' });
                        return;
                    }

                    if (result.length > 0) {
                        // User can edit only their own products
                        pool.query(
                            'UPDATE prods SET ? WHERE prodId = ?',
                            [productTable, prodId],
                            (error, result) => {
                                if (error) {
                                    console.error('Error updating user:', error);
                                    res.status(500).send('Internal Server Error');
                                } else {
                                    res.status(200).send({ message: 'Product updated successfully' });
                                }
                            }
                        );
                    } else {
                        // User doesn't have permission to edit this prod
                        res.status(403).send({ error: 'Unauthorized - Insufficient privileges' });
                    }
                });
            }
        });
    });
});

app.delete('/deleteProd/:id', bearer, (req, res, next) => {
    const prodId = req.params.id;
    const loggedInUser = req.headers.loggedinuser;

    checkTokenExpiry(req, res, () => {
        pool.query('SELECT role FROM adminuser WHERE userId = ?', [loggedInUser], (error, result) => {
            if (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            if (result.length > 0 && result[0].role === 69) {
                // Admin can delete any product
                deleteProduct(prodId, res);
            } else {
                // Check if the user has permission to delete the product
                pool.query('SELECT prodId FROM prods WHERE user = ? AND prodId = ?', [loggedInUser, prodId], (error, result) => {
                    if (error) {
                        console.error(error);
                        res.status(500).json({ error: 'Internal Server Error' });
                        return;
                    }

                    if (result.length > 0) {
                        // User can delete only their own products
                        deleteProduct(prodId, res);
                    } else {
                        // User doesn't have permission to delete this product
                        res.status(403).send({ error: 'Unauthorized - Insufficient privileges' });
                    }
                });
            }
        });
    });
});


app.get('/getProds/:id', bearer, (req, res) => {
    const prodId = req.params.id;
    const userId = req.headers.loggedinuser;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * itemsPerPage;
    let sql, queryParams;

    checkTokenExpiry(req, res, () => {
        let selectFields = 'p.*, pt.prodTypeName, c.categoryName, sc.subCategoryName, au.userName as createdByUser, au2.userName as updatedByUser'; // Selecting required fields

        if (prodId === ':id') {
            sql = req.isAdmin === 1 ?
                `SELECT ${selectFields} FROM prods p
                LEFT JOIN producttype pt ON p.prodType = pt.prodTypeId
                LEFT JOIN category c ON p.prodCategory = c.categoryId
                LEFT JOIN subcategory sc ON p.prodSubCategory = sc.subCategoryId
                LEFT JOIN adminUser au ON p.user = au.userId
                LEFT JOIN adminUser au2 ON p.updatedBy = au2.userId
                LIMIT ? OFFSET ?` :
                `SELECT ${selectFields} FROM prods p
                LEFT JOIN producttype pt ON p.prodType = pt.prodTypeId
                LEFT JOIN category c ON p.prodCategory = c.categoryId
                LEFT JOIN subcategory sc ON p.prodSubCategory = sc.subCategoryId
                LEFT JOIN adminUser au ON p.user = au.userId
                LEFT JOIN adminUser au2 ON p.updatedBy = au2.userId
                WHERE p.user = ? LIMIT ? OFFSET ?`;
            dataCountSql = req.isAdmin === 1 ? 'SELECT COUNT(*) as total FROM prods' : 'SELECT COUNT(*) as total FROM prods WHERE user = ?';

            queryParams = req.isAdmin === 1 ? [itemsPerPage, offset] : [userId, itemsPerPage, offset];
        } else {
            sql = req.isAdmin === 1 ?
                `SELECT ${selectFields} FROM prods p
                LEFT JOIN producttype pt ON p.prodType = pt.prodTypeId
                LEFT JOIN category c ON p.prodCategory = c.categoryId
                LEFT JOIN subcategory sc ON p.prodSubCategory = sc.subCategoryId
                LEFT JOIN adminUser au ON p.user = au.userId
                LEFT JOIN adminUser au2 ON p.updatedBy = au2.userId
                WHERE p.prodId = ? LIMIT ? OFFSET ?` :
                `SELECT ${selectFields} FROM prods p
                LEFT JOIN producttype pt ON p.prodType = pt.prodTypeId
                LEFT JOIN category c ON p.prodCategory = c.categoryId
                LEFT JOIN subcategory sc ON p.prodSubCategory = sc.subCategoryId
                LEFT JOIN adminUser au ON p.user = au.userId
                LEFT JOIN adminUser au2 ON p.updatedBy = au2.userId
                WHERE p.user = ? AND p.prodId = ? LIMIT ? OFFSET ?`;
            dataCountSql = req.isAdmin === 1 ? 'SELECT COUNT(*) as total FROM prods' : 'SELECT COUNT(*) as total FROM prods WHERE user = ?';

            queryParams = req.isAdmin === 1 ? [prodId, itemsPerPage, offset] : [userId, prodId, itemsPerPage, offset];
        }

        pool.query(sql, queryParams, (error, results) => {
            if (error) {
                console.error('Error fetching products:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                const countParams = queryParams.filter(param => typeof param === 'string');

                pool.query(dataCountSql, countParams, (error, totalCountResult) => {
                    if (error) {
                        console.error('Error fetching total count:', error);
                        res.status(500).json({ error: 'Internal Server Error' });
                    } else {
                        const totalData = totalCountResult[0].total;
                        const totalPages = Math.ceil(totalData / itemsPerPage);

                        res.json({
                            prods: results,
                            totalData,
                            totalPages,
                            currentPage: page,
                        });
                    }
                });
            }
        });
    });
});

// Create a new additional field
app.post('/additionalfields', bearer, (req, res) => {
    const loggedInUser = req.headers.loggedinuser;
    const createdby = loggedInUser;
    const createddate = Date.now();
    const { fieldName } = req.body;
    checkTokenExpiry(req, res, () => {
        pool.query('SELECT * from adminuser where userId = ?', [loggedInUser], (error, result) => {
            if (error) {
                res.status(500).json({ error: 'Internal Server Error' });
            }
            pool.query('SELECT MAX(fieldId) as last FROM additionalfields', (e, r) => {
                if (r[0].last === null) {
                    fieldId = 10000

                } else {
                    fieldId = r[0].last++ + 1;

                }
                const bodyData =
                    [fieldId, fieldName, createdby, createddate]
                pool.query('INSERT INTO additionalfields (fieldId,fieldName,createdby,createddate) VALUES (?,?,?,?)', bodyData, (error, result) => {
                    if (error) {
                        console.error(error);
                        res.status(500).json({ error: 'Internal Server Error' });
                    } else {
                        const newFieldId = result.insertId;
                        res.status(201).json({ id: newFieldId, fieldName });
                    }
                });
            })
        })
    })
});

// Read all additional fields
app.get('/additionalfields', (req, res) => {

    pool.query('SELECT * FROM additionalfields', (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            const rows = result;
            res.status(200).json(rows);
        }
    });
});

// Update an additional field
app.put('/additionalfields/:fieldId', (req, res) => {
    const { fieldName } = req.body;
    const { fieldId } = req.params;

    pool.query('UPDATE additionalfields SET fieldName = ? WHERE fieldId = ?', [fieldName, fieldId], (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(200).json({ id: fieldId, fieldName });
        }
    });
});

// Delete an additional field
app.delete('/additionalfields/:fieldId', (req, res) => {
    const { fieldId } = req.params;

    pool.query('DELETE FROM additionalfields WHERE fieldId = ?', [fieldId], (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(204).end();
        }
    });
});

// Create a new category additional field mapping
app.post('/categoryadditionalfieldmapping', bearer, (req, res) => {
    const loggedInUser = req.headers.loggedinuser;
    const createdby = loggedInUser;
    const createddate = new Date();
    const { categoryId, subCategoryId, fieldId, value, units, sold, size } = req.body;

    checkTokenExpiry(req, res, () => {
        pool.query('SELECT * FROM adminuser WHERE userId = ?', [loggedInUser], (error, result) => {
            if (error) {
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                const bodyData = [categoryId, subCategoryId, fieldId, value, units, sold, size, createdby, createddate];

                pool.query('INSERT INTO categoryadditionalfieldmapping (categoryId, subCategoryId, fieldId, value, units,sold,size,createdby, createddate) VALUES (?, ?, ?, ?, ?,?,?,?,?)', bodyData, (error, result) => {
                    if (error) {
                        console.error(error);
                        res.status(500).json({ error: 'Internal Server Error' });
                    } else {
                        const newMappingId = result.insertId;
                        res.status(201).json({ id: newMappingId, categoryId, fieldId, value });
                    }
                });
            }
        });
    });
});

// Read all category additional field mappings
app.get('/categoryadditionalfieldmapping', (req, res) => {
    pool.query('SELECT * FROM categoryadditionalfieldmapping', (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            const mappings = result;
            res.status(200).json(mappings);
        }
    });
});

// Update a category additional field mapping
app.put('/categoryadditionalfieldmapping/:mappingId', bearer, (req, res) => {
    const loggedInUser = req.headers.loggedinuser;
    const updatedby = loggedInUser;
    const updateddate = new Date();
    const { categoryId, subCategoryId, fieldId, value } = req.body;
    const { mappingId } = req.params;

    checkTokenExpiry(req, res, () => {
        pool.query('SELECT * FROM adminuser WHERE userId = ?', [loggedInUser], (error, result) => {
            if (error) {
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                pool.query('UPDATE categoryadditionalfieldmapping SET categoryId = ?, subCategoryId =  ? ,fieldId = ?, value = ?, updatedby = ?, updateddate = ? WHERE id = ?', [categoryId, subCategoryId, fieldId, value, updatedby, updateddate, mappingId], (error, result) => {
                    if (error) {
                        console.error(error);
                        res.status(500).json({ error: 'Internal Server Error' });
                    } else {
                        res.status(200).json({ id: mappingId, categoryId, fieldId, value });
                    }
                });
            }
        });
    });
});

// Delete a category additional field mapping
app.delete('/categoryadditionalfieldmapping/:mappingId', bearer, (req, res) => {
    const loggedInUser = req.headers.loggedinuser;
    const { mappingId } = req.params;

    checkTokenExpiry(req, res, () => {
        pool.query('DELETE FROM categoryadditionalfieldmapping WHERE id = ?', [mappingId], (error, result) => {
            if (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.status(204).end();
            }
        });
    });
});

// Create a new child additional field
app.post('/childadditionalfield', bearer, (req, res) => {
    const loggedInUser = req.headers.loggedinuser;
    const createdby = loggedInUser;
    const createddate = Date.now();
    const { childFieldTitle, parentFieldId } = req.body;

    checkTokenExpiry(req, res, () => {
        pool.query('SELECT * FROM adminuser WHERE userId = ?', [loggedInUser], (error, result) => {
            if (error) {
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                const bodyData = [childFieldTitle, parentFieldId,createddate, createdby];

                pool.query('INSERT INTO childadditionalfield (childFieldTitle,  parentFieldId, createddate, createdby) VALUES (?, ?, ?, ?)', bodyData, (error, result) => {
                    if (error) {
                        console.error(error);
                        res.status(500).json({ error: 'Internal Server Error' });
                    } else {
                        const newFieldId = result.insertId;
                        res.status(201).json({ id: newFieldId });
                    }
                });
            }
        });
    });
});

// Read all child additional fields
app.get('/childadditionalfield', (req, res) => {
    pool.query('SELECT caf.* ,af.fieldName FROM childadditionalfield caf LEFT JOIN additionalfields af ON caf.parentFieldId = af.fieldId ', (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            const fields = result;
            res.status(200).json(fields);
        }
    });
});

// Update a child additional field
app.put('/childadditionalfield/:fieldId', bearer, (req, res) => {
    const loggedInUser = req.headers.loggedinuser;
    const updatedby = loggedInUser;
    const updateddate = new Date();
    const { title, description, list } = req.body;
    const { fieldId } = req.params;

    checkTokenExpiry(req, res, () => {
        pool.query('SELECT * FROM adminuser WHERE userId = ?', [loggedInUser], (error, result) => {
            if (error) {
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                pool.query('UPDATE childadditionalfield SET title = ?, description = ?, list = ?, updatedby = ?, updateddate = ? WHERE id = ?', [title, description, list, updatedby, updateddate, fieldId], (error, result) => {
                    if (error) {
                        console.error(error);
                        res.status(500).json({ error: 'Internal Server Error' });
                    } else {
                        res.status(200).json({ id: fieldId, title, description, list });
                    }
                });
            }
        });
    });
});

// Delete a child additional field
app.delete('/childadditionalfield/:fieldId', bearer, (req, res) => {
    const loggedInUser = req.headers.loggedinuser;
    const { fieldId } = req.params;

    checkTokenExpiry(req, res, () => {
        pool.query('DELETE FROM childadditionalfield WHERE id = ?', [fieldId], (error, result) => {
            if (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.status(204).end();
            }
        });
    });
});



module.exports = app;