const functions = require('../functions/scripts')
const express = require('express')
const pool = functions.pool
const app = functions.app
const checkTokenExpiry = functions.checkTokenExpiry
const bearer = functions.bearer
const superPrivilege = functions.superPrivilege

app.use(express.json());



app.get('/listProductType/:id', (req, res) => {
    const prodTypeId = req.params.id;
    let ALL_PRODUCT_TYPES_QUERY = `
    SELECT 
        pt.prodTypeId, 
        pt.prodTypeName, 
        COALESCE(SUM(p.totalProducts), 0) as totalProducts 
    FROM 
        producttype pt
        LEFT JOIN (
            SELECT prodType, COUNT(*) as totalProducts FROM prods GROUP BY prodType
        ) p ON pt.prodTypeId = p.prodType
    WHERE 
        pt.status = 1
    `;
    let groupStatement = ' GROUP BY pt.prodTypeId, pt.prodTypeName'
    let query

    let queryParams = [];

    if (prodTypeId !== ':id' || !isNaN(prodTypeId)) {
        query = ALL_PRODUCT_TYPES_QUERY + ' AND pt.prodTypeId = ?';
        queryParams.push(parseInt(prodTypeId));
    }

    const finalQuery = (prodTypeId === ':id') ? ALL_PRODUCT_TYPES_QUERY + groupStatement : query + groupStatement;

    pool.query(finalQuery, queryParams, (error, result) => {
        if (error) {
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.status(200).json({ data: result });
    });
});




app.get('/listCategory/:id', (req, res) => {
    const categoryId = req.params.id;
    const prodTypeId = req.query.prodTypeId;
    const status = req.query.status;
    let ALL_PRODUCT_TYPES_QUERY = `
    SELECT
    c.categoryName,
    c.categoryId,
    pt.prodTypeId, 
    pt.prodTypeName,

    COALESCE(SUM(p.totalProducts), 0) as totalProducts
        FROM 
            producttype pt
        LEFT JOIN (
            SELECT prodType, COUNT(*) as totalProducts FROM prods GROUP BY prodCategory
        ) p ON pt.prodTypeId = p.prodType
        INNER JOIN category c ON c.prodTypeId = pt.prodTypeId
        WHERE 
    pt.status = 1`;
    const groupStatement = ' GROUP BY c.categoryName, pt.prodTypeId, pt.prodTypeName'

    const queryParams = [];

    if (prodTypeId !== undefined && prodTypeId !== null) {
        ALL_PRODUCT_TYPES_QUERY += ' AND c.prodTypeId = ?';
        queryParams.push(prodTypeId);
    }


    if (categoryId !== ':id') {
        ALL_PRODUCT_TYPES_QUERY += ' AND c.categoryId = ?';
        queryParams.push(categoryId);
    }
    ALL_PRODUCT_TYPES_QUERY += groupStatement


    pool.query(ALL_PRODUCT_TYPES_QUERY, queryParams, (error, result) => {

        if (error) {
            console.log(error)
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        
        res.status(200).json({ data: result });
    });
});



app.get('/listSubCategory/:id', (req, res) => {
    const subCategoryId = req.params.id;
    const categoryId = req.query.categoryId;
    let ALL_PRODUCT_TYPES_QUERY = `
    SELECT 
    sc.subCategoryName,
    sc.subCategoryId, 
    c.categoryName,
    c.categoryId,
    pt.prodTypeId, 
    pt.prodTypeName,
    COALESCE(SUM(p.totalProducts), 0) as totalProducts
FROM 
    producttype pt
LEFT JOIN (
    SELECT prodType, COUNT(*) as totalProducts FROM prods GROUP BY prodSubCategory
) p ON pt.prodTypeId = p.prodType

INNER JOIN subCategory sc ON pt.prodTypeId = sc.prodTypeId -- Assuming pt.prodTypeId is the relationship between producttype and subCategory

INNER JOIN category c ON c.categoryId = sc.categoryId
WHERE 
    pt.status = 1`;
    const groupStatement = ' GROUP BY sc.subCategoryName,c.categoryName, pt.prodTypeId, pt.prodTypeName'

        let query = 'SELECT sc.*, pt.prodTypeName, c.categoryName FROM subcategory sc LEFT JOIN category c ON sc.categoryId = c.categoryId LEFT JOIN producttype pt ON pt.prodTypeId = c.prodTypeId WHERE 1 = 1';
        const queryParams = [];

        if (categoryId !== undefined && categoryId !== null) {
            ALL_PRODUCT_TYPES_QUERY+= ' AND sc.categoryId = ?';
            queryParams.push(categoryId);
        }


        if (subCategoryId !== ':id') {
            ALL_PRODUCT_TYPES_QUERY+= ' AND sc.subCategoryId = ?';
            queryParams.push(subCategoryId);
        }

        pool.query(ALL_PRODUCT_TYPES_QUERY+groupStatement, queryParams, (error, result) => {
            if (error) {
                console.log(error)
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            res.status(200).json({ data: result });
        });
    });




module.exports = app;