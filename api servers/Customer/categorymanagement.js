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
        INNER JOIN category c ON c.prodTypeId = pt.prodTypeId
        LEFT JOIN (
            SELECT prodCategory, COUNT(*) as totalProducts FROM prods GROUP BY prodCategory
        ) p ON c.categoryId = p.prodCategory
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
    FROM producttype pt
    INNER JOIN subcategory sc ON pt.prodTypeId = sc.prodTypeId

    LEFT JOIN (
        SELECT prodSubCategory, COUNT(*) as totalProducts FROM prods GROUP BY prodSubCategory
    ) p ON sc.subCategoryId = p.prodSubCategory
    INNER JOIN category c ON c.categoryId = sc.categoryId
    WHERE 
    pt.status = 1`;
    const groupStatement = ' GROUP BY sc.subCategoryName,c.categoryName, pt.prodTypeId, pt.prodTypeName'

    let query = 'SELECT sc.*, pt.prodTypeName, c.categoryName FROM subcategory sc LEFT JOIN category c ON sc.categoryId = c.categoryId LEFT JOIN producttype pt ON pt.prodTypeId = c.prodTypeId WHERE 1 = 1';
    const queryParams = [];

    if (categoryId !== undefined && categoryId !== null) {
        ALL_PRODUCT_TYPES_QUERY += ' AND sc.categoryId = ?';
        queryParams.push(categoryId);
    }


    if (subCategoryId !== ':id') {
        ALL_PRODUCT_TYPES_QUERY += ' AND sc.subCategoryId = ?';
        queryParams.push(subCategoryId);
    }

    pool.query(ALL_PRODUCT_TYPES_QUERY + groupStatement, queryParams, (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.status(200).json({ data: result });
    });
});


app.get('/listProducts/:id', (req, res) => {
    const prodId = req.params.id
    const subCategoryId = req.query.subCategoryId;
    const categoryId = req.query.categoryId;
    const prodTypeId = req.query.prodTypeId;

    let ALL_PRODUCT_TYPES_QUERY =
        `
        SELECT
        p.prodId,
        p.prodName,
        p.prodTitle,
        p.prodSubTitle,
        p.prodShortDescription,
        p.prodDescription,
        p.prodLocation,
        p.prodLocation1,
        p.prodLocation2,
        p.cost,
        p.quantity,
        p.quantityType,
        pt.prodTypeName,
        c.categoryName,
        sc.subCategoryName,
        pi.imageUrl
    FROM prods p
    LEFT JOIN producttype pt ON pt.prodTypeId = p.prodType
    LEFT JOIN category c ON c.categoryId = p.prodCategory
    LEFT JOIN subcategory sc ON sc.subCategoryId = p.prodSubCategory
    LEFT JOIN productimages pi ON pi.prodId = p.prodId
    WHERE p.status = 1 AND pt.status = 1

    `

    const groupStatement = ' GROUP BY sc.subCategoryName,c.categoryName, pt.prodTypeId, pt.prodTypeName'

    const queryParams = [];
    if (prodId !== ':id') {
        ALL_PRODUCT_TYPES_QUERY += ' AND p.prodId = ?';
        queryParams.push(prodId);
    }
    if (categoryId !== undefined && categoryId !== null) {
        ALL_PRODUCT_TYPES_QUERY += ' AND c.categoryId = ?';
        queryParams.push(categoryId);
    }


    if (subCategoryId !== undefined && subCategoryId !== null) {
        ALL_PRODUCT_TYPES_QUERY += ' AND sc.subCategoryId = ?';
        queryParams.push(subCategoryId);
    }
    if (prodTypeId !== undefined && prodTypeId !== null) {
        ALL_PRODUCT_TYPES_QUERY += ' AND pt.prodTypeId = ?';
        queryParams.push(prodTypeId);
    }
    pool.query(ALL_PRODUCT_TYPES_QUERY + groupStatement, queryParams, (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.status(200).json({ data: result });
    });
});



module.exports = app;