const functions = require('../functions/scripts')
const express = require('express')
const pool = functions.pool
const app = functions.app
const checkTokenExpiry = functions.checkTokenExpiry
const bearer = functions.bearer
const superPrivilege = functions.superPrivilege

app.use(express.json());


app.post('/addFeature', bearer, superPrivilege, (req, res) => {
    const user = req.headers.loggedinuser
    let featureId
    const { featureName, featureDescription,status } = req.body;
    checkTokenExpiry(req, res, () => {
        pool.query('SELECT * from adminuser where userId = ?', [user], (error, result) => {
            if (error) {
                res.status(500).json({ error: 'Internal Server Error' });
            }
            const createdby = result[0].userId
            let createddate
            createddate = Date.now()
            pool.query('SELECT MAX(featureId) as last FROM features', (e, r) => {
                if (r[0].last === null) {
                    featureId = 10000

                } else {
                    featureId = r[0].last++ + 1;

                }
                const productType = { featureId, featureName, featureDescription,status, createdby, createddate };

                pool.query('INSERT INTO features SET ?', productType, (error, result) => {
                    if (error) {
                        res.status(500).json({ e: 'Internal Server Error' });
                    } else {
                        res.status(201).json({ message: 'Feature created successfully' });
                    }
                })
            });
        })
    })

});

app.get('/getFeature/:id', bearer, (req, res) => {
    const featureId = req.params.id;
    const status = req.query.status;
    let query = 'SELECT * FROM features WHERE 1=1';
    let queryParams = [];
    let ALL_PRODUCT_TYPES_QUERY ='SELECT * FROM features'
    if (featureId !== ':id' && !isNaN(featureId)) { 
        query += ' AND featureId = ?';
        queryParams.push(parseInt(featureId));
    }

    if (status) {
        query += ' AND status = ?';
        queryParams.push(status);
    }

    checkTokenExpiry(req, res, () => {
        const finalQuery = (featureId === ':id' && !status) ? ALL_PRODUCT_TYPES_QUERY : query;

        pool.query(finalQuery, queryParams, (error, result) => {
            if (error) {
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            res.status(200).json({ data: result });
        });
    });
});

// app.delete('/deleteProductType/:id', bearer, superPrivilege, (req, res) => {
//     const prodTypeId = req.params.id;

//     checkTokenExpiry(req, res, () => {
//         pool.query('SELECT id FROM producttype WHERE prodTypeId = ?', [prodTypeId], (error, result) => {
//             if (error) {
//                 res.status(500).json({ error: 'Internal Server Error' })
//                 return;
//             } else {
//                 if (result.length > 0) {
//                     pool.query('DELETE FROM producttype WHERE prodTypeId = ?', [prodTypeId], (error, result) => {
//                         if (error) {
//                             console.error('Error deleting product type:', error);
//                             res.status(500).send('Internal Server Error');
//                         } else {
//                             res.status(200).send('Product type deleted successfully');

//                         }
//                     });
//                 } else {
//                     res.status(404).send({ error: 'Product type not found' });
//                 }
//             }
//         })
//     })
// });

// app.put('/updateProductType/:id', bearer, superPrivilege, (req, res, next) => {
//     const prodTypeId = req.params.id;
//     const loggedInUser = req.headers.loggedinuser
//     const { prodTypeName, status } = req.body;
//     checkTokenExpiry(req, res, () => {
//         const date = Date.now()
//         pool.query('SELECT prodTypeId FROM producttype WHERE prodTypeId = ?', [prodTypeId], (error, result) => {
//             if (error) {
//                 res.status(500).json({ error: 'Internal Server Error' })
//                 return;
//             }
//             if (result.length > 0) {
//                 pool.query(
//                     'UPDATE producttype SET prodTypeName = ?, status = ?,updatedby=?,updateddate=? WHERE prodTypeId = ?',
//                     [prodTypeName, status, loggedInUser, date, prodTypeId],
//                     (error, result) => {
//                         if (error) {
//                             console.error('Error updating product type:', error);
//                             res.status(500).send('Internal Server Error');
//                         } else {
//                             res.status(200).send({ message: 'product type updated successfully' });
//                         }
//                     }
//                 );
//             } else {
//                 res.status(404).send({ error: 'Product Type not found' });
//             }
//         })


//     })
// })



module.exports = app;