const functions = require('./functions/scripts')
const express = require('express')
const pool = functions.pool
const app = functions.app
const checkTokenExpiry = functions.checkTokenExpiry
const bearer = functions.bearer
const superPrivilege = functions.superPrivilege

app.use(express.json());


app.post('/addProductType', bearer, superPrivilege, (req, res) => {
    const user = req.headers.loggedinuser
    let prodTypeId
    const { prodTypeName, status } = req.body;
    checkTokenExpiry(req, res, () => {
        pool.query('SELECT * from adminuser where userId = ?', [user], (error, result) => {
            if (error) {
                res.status(500).json({ error: 'Internal Server Error' });
            }
            const createdby = result[0].userId
            let createddate
            createddate = Date.now()
            pool.query('SELECT MAX(prodTypeId) as last FROM producttype', (e, r) => {
                if (r[0].last === null) {
                    prodTypeId = 10000

                } else {
                    prodTypeId = r[0].last++ + 1;

                }
                const productType = { prodTypeId, prodTypeName, status, createdby, createddate };

                pool.query('INSERT INTO producttype SET ?', productType, (error, result) => {
                    if (error) {
                        res.status(500).json({ e: 'Internal Server Error' });
                    } else {
                        res.status(201).json({ message: 'Product type created successfully' });
                    }
                })
            });
        })
    })

});

app.get('/getProductType/:id', bearer, superPrivilege, (req, res) => {
    const prodTypeId = req.params.id
    checkTokenExpiry(req, res, () => {
        if (prodTypeId === ':id') {
            pool.query('SELECT * FROM producttype', (error, result) => {
                res.status(200).json({ data: result })
                if (error) {
                    res.status(500).json({ error: 'Internal Server Error' });
                    return;
                }
            })
        } else {
            pool.query('SELECT * FROM producttype WHERE prodTypeId=?', [prodTypeId], (error, result) => {
                res.status(200).json({ data: result })
                if (error) {
                    res.status(500).json({ error: 'Internal Server Error' });
                    return;
                }
            })
        }
    })
});

app.delete('/deleteProductType/:id', bearer, superPrivilege, (req, res) => {
    const prodTypeId = req.params.id;

    checkTokenExpiry(req, res, () => {
        pool.query('SELECT id FROM producttype WHERE prodTypeId = ?', [prodTypeId], (error, result) => {
            if (error) {
                res.status(500).json({ error: 'Internal Server Error' })
                return;
            } else {
                if (result.length > 0) {
                    pool.query('DELETE FROM producttype WHERE prodTypeId = ?', [prodTypeId], (error, result) => {
                        if (error) {
                            console.error('Error deleting product type:', error);
                            res.status(500).send('Internal Server Error');
                        } else {
                            res.status(200).send('Product type deleted successfully');

                        }
                    });
                } else {
                    res.status(404).send({ error: 'Product type not found' });
                }
            }
        })
    })
});

app.put('/updateProductType/:id', bearer, superPrivilege, (req, res, next) => {
    const prodTypeId = req.params.id;
    const loggedInUser = req.headers.loggedinuser
    const { prodTypeName, status } = req.body;
    checkTokenExpiry(req, res, () => {
        const date = Date.now()
        pool.query('SELECT prodTypeId FROM producttype WHERE prodTypeId = ?', [prodTypeId], (error, result) => {
            if (error) {
                res.status(500).json({ error: 'Internal Server Error' })
                return;
            }
            if (result.length > 0) {
                pool.query(
                    'UPDATE producttype SET prodTypeName = ?, status = ?,updatedby=?,updateddate=? WHERE prodTypeId = ?',
                    [prodTypeName, status, loggedInUser, date, prodTypeId],
                    (error, result) => {
                        if (error) {
                            console.error('Error updating product type:', error);
                            res.status(500).send('Internal Server Error');
                        } else {
                            res.status(200).send({ message: 'product type updated successfully' });
                        }
                    }
                );
            } else {
                res.status(404).send({ error: 'Product Type not found' });
            }
        })


    })
})

app.post('/addCategory', bearer, superPrivilege, (req, res) => {
    const user = req.headers.loggedinuser
    let categoryId
    const { prodTypeId, categoryName, status } = req.body;
    checkTokenExpiry(req, res, () => {
        pool.query('SELECT * from adminuser where userId = ?', [user], (error, result) => {
            if (error) {
                res.status(500).json({ error: 'Internal Server Error' });
            }
            const createdby = result[0].userId
            let createddate
            createddate = Date.now()
            pool.query('SELECT MAX(categoryId) as last FROM category', (e, r) => {
                if (r[0].last === null) {
                    categoryId = 10000

                } else {
                    categoryId = r[0].last++ + 1;
                }

                const category = { categoryId, prodTypeId, categoryName, status, createdby, createddate };

                pool.query('INSERT INTO category SET ?', [category], (error, result) => {
                    if (error) {
                        res.status(500).json({ e: 'Internal Server Error' });
                    } else {
                        res.status(201).json({ message: 'Category created successfully' });
                    }
                })
            });
        })
    })

});

app.get('/getCategory/:id', bearer, superPrivilege, (req, res) => {
    const categoryId = req.params.id;
    const prodTypeId = req.query.prodTypeId; // Extracting prodTypeId from query params

    checkTokenExpiry(req, res, () => {
        let query = 'SELECT c.*, pt.prodTypeName FROM category c LEFT JOIN producttype pt ON c.prodTypeId = pt.prodTypeId WHERE 1=1';
        const queryParams = [];

        if (prodTypeId !== undefined && prodTypeId !== null) {
            query += ' AND c.prodTypeId = ?';
            queryParams.push(prodTypeId);
        }

        if (categoryId !== ':id') {
            query += ' AND c.categoryId = ?';
            queryParams.push(categoryId);
        }

        pool.query(query, queryParams, (error, result) => {
            if (error) {
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            res.status(200).json({ data: result });
        });
    });
});

app.delete('/deleteCategory/:id', bearer, superPrivilege, (req, res) => {
    const categoryId = req.params.id;

    checkTokenExpiry(req, res, () => {
        pool.query('SELECT id FROM category WHERE categoryId = ?', [categoryId], (error, result) => {
            if (error) {
                res.status(500).json({ error: 'Internal Server Error' })
                return;
            } else {
                if (result.length > 0) {
                    pool.query('DELETE FROM category WHERE categoryId = ?', [categoryId], (error, result) => {
                        if (error) {
                            console.error('Error deleting category:', error);
                            res.status(500).send('Internal Server Error');
                        } else {
                            res.status(200).send('category deleted successfully');

                        }
                    });
                } else {
                    res.status(404).send({ error: 'Category not found' });
                }
            }
        })
    })
});

app.put('/updateCategory/:id', bearer, superPrivilege, (req, res, next) => {
    const categoryId = req.params.id;
    const loggedInUser = req.headers.loggedinuser
    const { prodTypeId, categoryName, status } = req.body;
    checkTokenExpiry(req, res, () => {
        const date = Date.now()
        pool.query('SELECT categoryId FROM category WHERE categoryId = ?', [categoryId], (error, result) => {
            if (error) {
                res.status(500).json({ error: 'Internal Server Error' })
                return;
            }
            if (result.length > 0) {
                pool.query(
                    'UPDATE category SET prodTypeId=?,categoryName = ?, status = ?,updatedby=?,updateddate=? WHERE categoryId = ?',
                    [prodTypeId, categoryName, status, loggedInUser, date, categoryId],
                    (error, result) => {
                        if (error) {
                            console.error('Error updating category:', error);
                            res.status(500).send('Internal Server Error');
                        } else {
                            res.status(200).send({ message: 'category updated successfully' });
                        }
                    }
                );
            } else {
                res.status(404).send({ error: 'category not found' });
            }
        })
    })
})

app.post('/addSubCategory', bearer, superPrivilege, (req, res) => {
    const user = req.headers.loggedinuser
    let subCategoryId, prodTypeId
    const { categoryId, subCategoryName, status } = req.body;
    checkTokenExpiry(req, res, () => {
        pool.query('SELECT * from adminuser where userId = ?', [user], (error, result) => {
            if (error) {
                res.status(500).json({ error: 'Internal Server Error' });
            }
            const createdby = result[0].userId
            let createddate
            createddate = Date.now()
            pool.query('SELECT * FROM category WHERE categoryId=?', [categoryId], (e, resp) => {
                if (e) {
                    res.status(500).json({ e: 'Internal Server Error' });
                } else {


                    pool.query('SELECT MAX(subCategoryId) as last FROM subCategory', (e, r) => {
                        if (r[0].last === null) {
                            subCategoryId = 10000

                        } else {
                            subCategoryId = r[0].last++ + 1;
                        }
                        prodTypeId = resp[0].prodTypeId
                        const subCategory = { subCategoryId, categoryId, prodTypeId, subCategoryName, status, createdby, createddate };

                        pool.query('INSERT INTO subcategory SET ?', [subCategory], (error, result) => {
                            if (error) {
                                console.log(error)
                                res.status(500).json({ e: 'Internal Server Error' });
                            } else {
                                res.status(201).json({ message: 'subCategory created successfully' });
                            }
                        })
                    });
                }
            })
        })
    })
});

app.get('/getSubCategory/:id', bearer, superPrivilege, (req, res) => {
    const subCategoryId = req.params.id;
    const categoryId = req.query.categoryId; // Extracting prodTypeId from query params

    checkTokenExpiry(req, res, () => {

        let query = 'SELECT sc.*, pt.prodTypeName, c.categoryName FROM subcategory sc LEFT JOIN category c ON sc.categoryId = c.categoryId LEFT JOIN producttype pt ON pt.prodTypeId = c.prodTypeId    WHERE 1 = 1';
        const queryParams = [];

        if (categoryId !== undefined && categoryId !== null) {
            query += ' AND sc.categoryId = ?';
            queryParams.push(categoryId);
        }

        if (subCategoryId !== ':id') {
            query += ' AND sc.subCategoryId = ?';
            queryParams.push(subCategoryId);
        }

        pool.query(query, queryParams, (error, result) => {
            if (error) {
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            res.status(200).json({ data: result });
        });
    });
});

app.delete('/deleteSubCategory/:id', bearer, superPrivilege, (req, res) => {
    const subCategoryId = req.params.id;

    checkTokenExpiry(req, res, () => {
        pool.query('SELECT id FROM subCategory WHERE subCategoryId = ?', [subCategoryId], (error, result) => {
            if (error) {
                res.status(500).json({ error: 'Internal Server Error' })
                return;
            } else {
                if (result.length > 0) {
                    pool.query('DELETE FROM subcategory WHERE subCategoryId = ?', [subCategoryId], (error, result) => {
                        if (error) {
                            console.error('Error deleting subCategory:', error);
                            res.status(500).send('Internal Server Error');
                        } else {
                            res.status(200).send('Sub Category deleted successfully');

                        }
                    });
                } else {
                    res.status(404).send({ error: 'Sub Category not found' });
                }
            }
        })
    })
});

app.put('/updateSubCategory/:subCategoryId', bearer, superPrivilege, (req, res) => {
    const user = req.headers.loggedinuser;
    const subCategoryId = req.params.subCategoryId;
    const { categoryId, subCategoryName, status } = req.body;

    checkTokenExpiry(req, res, () => {
        pool.query('SELECT * FROM adminuser WHERE userId = ?', [user], (error, result) => {
            if (error) {
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            const updatedBy = result[0].userId;
            const updatedDate = Date.now() // Update with the current date/time

            // Check if the subcategory exists and retrieve its details
            pool.query('SELECT * FROM subcategory WHERE subCategoryId = ?', [subCategoryId], (err, subCategoryResult) => {
                if (err) {
                    return res.status(500).json({ error: 'Internal Server Error' });
                }

                if (subCategoryResult.length === 0) {
                    return res.status(404).json({ error: 'Subcategory not found' });
                }

                const subCategory = subCategoryResult[0];
                // Modify the subcategory details based on provided data
                subCategory.subCategoryName = subCategoryName || subCategory.subCategoryName;
                subCategory.categoryId = categoryId || subCategory.categoryId;

                subCategory.status = status || subCategory.status;
                subCategory.updatedby = updatedBy;
                subCategory.updateddate = updatedDate;

                // Update the subcategory
                pool.query('UPDATE subcategory SET ? WHERE subCategoryId = ?', [subCategory, subCategoryId], (updateError, updateResult) => {
                    if (updateError) {
                        return res.status(500).json({ error: 'Internal Server Error' });
                    }
                    res.status(200).json({ message: 'Subcategory updated successfully' });
                });
            });
        });
    });
});

module.exports = app;