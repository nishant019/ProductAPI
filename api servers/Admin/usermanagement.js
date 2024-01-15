const functions = require('../functions/scripts')
const express = require('express')

const pool = functions.pool
const app = functions.app
const checkUserRole = functions.checkUserRole

const checkTokenExpiry = functions.checkTokenExpiry
const bearer = functions.bearer
const adminValidations = functions.adminValidations
const itemsPerPage = functions.itemsPerPage
const superPrivilege = functions.superPrivilege
const hashPassword = functions.hashPassword

app.use(express.json());

app.post('/addUsers', bearer, superPrivilege, (req, res) => {
    const user = req.headers.loggedinuser
    const { userName, password, email, role, fullName, status, userId } = req.body;
    checkTokenExpiry(req, res, () => {
        hashPassword(password).then(e => {
            pool.query('SELECT * from adminuser where userId = ?', [user], (error, result) => {
                if (error) {
                    res.status(500).json({ error: 'Internal Server Error' });
                }
                const createdby = result[0].userId
                let createddate
                const adminUser = { userName, password, email, role, status, fullName, userId, createddate, createdby };
                adminUser.password = e
                adminUser.createddate = Date.now()
                pool.query('SELECT MAX(userId) as last FROM adminuser', (e, r) => {
                    adminUser.userId = r[0].last++ + 1;
                    adminValidations(req, res, () => {
                        pool.query('INSERT INTO adminuser SET ?', adminUser, (error, result) => {
                            if (error) {
                                console.error('Error inserting admin user:', error);
                                res.status(500).json({ error: 'Internal Server Error' });
                            } else {
                                res.status(201).json({ message: 'Admin user created successfully' });
                            }
                        })
                    })
                });
            });
        })
    })

});

app.get('/getAdminUsers/:id', bearer, checkUserRole, (req, res) => {
    const userId = req.params.id;
    const loggedInUser = req.headers.loggedinuser;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * itemsPerPage;
    let sql, dataCountSql, queryParams;

    checkTokenExpiry(req, res, () => {
        if (userId === ':id') {
            sql = req.isAdmin === 1 ? 'SELECT * FROM adminuser LIMIT ? OFFSET ?' : 'SELECT * FROM adminuser WHERE userId = ? LIMIT ? OFFSET ?';
            dataCountSql = req.isAdmin === 1 ? 'SELECT COUNT(*) as total FROM adminuser' : 'SELECT COUNT(*) as total FROM adminuser WHERE userId = ?';
            queryParams = req.isAdmin === 1 ? [itemsPerPage, offset] : [loggedInUser, itemsPerPage, offset];
        } else {
            sql = req.isAdmin === 1 ? 'SELECT * FROM adminuser WHERE userId = ? LIMIT ? OFFSET ?' : 'SELECT * FROM adminuser WHERE userId = ? AND userId = ? LIMIT ? OFFSET ?';
            dataCountSql = req.isAdmin === 1 ? 'SELECT COUNT(*) as total FROM adminuser WHERE userId = ?' : 'SELECT COUNT(*) as total FROM users WHERE userId = ? AND user_id = ?';
            queryParams = req.isAdmin === 1 ? [userId, itemsPerPage, offset] : [loggedInUser, userId, itemsPerPage, offset];
        }

        pool.query(sql, queryParams, (error, results) => {
            if (error) {
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
                            users: results,
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

app.delete('/deleteUser/:id', bearer, superPrivilege, (req, res) => {
    const userId = req.params.id;

    checkTokenExpiry(req, res, () => {
        pool.query('SELECT id FROM adminuser WHERE userId = ?', [userId], (error, result) => {
            if (error) {
                res.status(500).json({ error: 'Internal Server Error' })
                return;
            } else {
                if (result.length > 0) {
                    pool.query('DELETE FROM adminuser WHERE userId = ?', [userId], (error, result) => {
                        if (error) {
                            console.error('Error deleting user:', error);
                            res.status(500).send('Internal Server Error');
                        } else {
                            pool.query('DELETE FROM tkn_store WHERE user = ?', [userId], (error, result) => {
                                if (error) {
                                    res.status(500).json({ error: 'Internal Server Error' })
                                    return;
                                }
                                res.status(200).send('User deleted successfully');
                            })
                        }
                    });
                } else {
                    res.status(404).send({ error: 'User not found' });
                }
            }
        })
    })
});

app.put('/updateUser/:id', bearer, superPrivilege, (req, res, next) => {
    const userId = req.params.id;
    const role = req.body.role;
    const loggedInUser = req.headers.loggedinuser
    const { userName, email, status, fullName } = req.body;
    checkTokenExpiry(req, res, () => {
        pool.query('SELECT * FROM adminuser WHERE userId = ?', [userId], (error, result) => {
            if (error) {
                res.status(500).json({ error: 'Internal Server Error' })
                return;
            }
            if (result.length > 0) {
                const date = Date.now()
                pool.query('SELECT userId FROM adminuser WHERE userId = ?', [loggedInUser], (error, result) => {
                    if (error) {
                        res.status(500).json({ error: 'Internal Server Error' })
                        return;
                    }
                    if (result.length > 0) {
                        adminValidations(req, res, () => {
                            const updated = result[0].userId
                            pool.query(
                                'UPDATE adminuser SET userName = ?, email = ? , role=?,status=?,fullName=?,updatedby=?,updateddate=? WHERE userId = ?',
                                [userName, email, role, status, fullName, updated, date, userId],
                                (error, result) => {
                                    if (error) {
                                        console.error('Error updating user:', error);
                                        res.status(500).send('Internal Server Error');
                                    } else {
                                        res.status(200).send({ message: 'User updated successfully' });
                                    }
                                }
                            );
                        })
                    }
                })

            } else {
                res.status(404).send({ error: 'User not found' });
            }
        })
    })

})

module.exports = app;