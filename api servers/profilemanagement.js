const functions = require('./functions/scripts')
const express = require('express')

const jwt = require('jsonwebtoken');

const pool = functions.pool
const app = functions.app
const checkTokenExpiry = functions.checkTokenExpiry
const bearer = functions.bearer
const basicAuth = functions.basicAuth
const adminValidations = functions.adminValidations

const hashPassword = functions.hashPassword
const comparePasswords = functions.comparePasswords
const passwordValidations = functions.passwordValidations

app.use(express.json());


app.post('/login', basicAuth, (req, res) => {
    let date = Date.now()
    let tkn = ''
    let user = ''
    let dbData = ''
    let token

    pool.query('SELECT * FROM adminuser where userName=?', [req.body.userName], (error, result) => {
        if (error) {
            console.error('Error Listing Admin Users', error);
            res.status(500).json({ error: 'Internal Server Error' })
        } else {
            const response = { response: result }
            if (response.response.length > 0) {
                const userId = result[0].userId
                let isAuthenticated = false;
                for (const adminUser of response.response) {
                    hashPassword(req.body.password).then(encoded => {
                        comparePasswords(req.body.password, adminUser.password).then(e => {
                            if (e === true) {
                                isAuthenticated = true
                                token = jwt.sign(
                                    {
                                        userName: adminUser.userName,
                                        password: adminUser.password,
                                        userId: result[0].userId
                                    },
                                    'your-secret-key'
                                );

                                tkn = token
                                user = adminUser.userId
                                let createddate = date
                                let updateddate = date
                                dbData = {
                                    tkn, user, createddate, updateddate
                                }

                                pool.query('select user from tkn_store where user=?', [userId], (error, result) => {
                                    if (error) {
                                        console.error('Error listing token:', error);
                                    }
                                    if (result.length > 0) {
                                        pool.query('UPDATE tkn_store SET tkn=? ,updateddate=? WHERE user=?', [tkn, date, userId], (error, result) => {
                                            if (error) {
                                                console.error('Error updating token:', error);
                                            }
                                        })
                                    }
                                    else {
                                        pool.query('INSERT INTO tkn_store SET ?', dbData, (error, result) => {
                                            if (error) {
                                                console.error('Error inserting token:', error);
                                            }
                                        })
                                    }
                                    if (isAuthenticated === true) {

                                        res.status(200).json({ token, user });

                                    } else {
                                        res.status(401).json({ error: 'Authentication failed' });
                                    }

                                });
                            }
                            else {
                                res.status(401).json({ error: 'Password Didnot Match' });
                            }
                        })
                    })
                    break;
                }
            } else {
                res.status(401).json({ error: 'Admin users not found' });
            }
        }
    })
});

app.put('/manageUserInfo/:id', bearer, (req, res, next) => {
    const userId = req.headers.loggedinuser;
    const { userName, email, fullName } = req.body;
    checkTokenExpiry(req, res, () => {
        pool.query('SELECT * FROM adminuser WHERE userId = ?', [userId], (error, result) => {
            if (error) {
                res.status(500).json({ error: 'Internal Server Error' })
                return;
            }
            req.params.id = result[0].userId
            const user = result[0].userId
            const date = Date.now()
            if (result.length > 0) {
                adminValidations(req, res, () => {
                    pool.query(
                        'UPDATE adminuser SET userName = ?, email = ? ,fullName=?,updatedby = ? ,updateddate = ? WHERE userId = ?',
                        [userName, email, fullName, user, date, userId],
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
            } else {
                res.status(404).send({ error: 'User not found' });
            }
        })
    })


})

app.get('/getUserDetails', bearer, (req, res) => {
    const userName = req.headers.loggedinuser;
    checkTokenExpiry(req, res, () => {
        pool.query('SELECT userId,userName,email,role,fullName FROM adminuser WHERE userId = ?', [userName], (error, result) => {
            if (error) {
                console.error('Error Listing Admin Users', error);
                res.status(500).json({ error: 'Internal Server Error' })
            } else {
                res.status(200).json({ users: result })
            }
        })
    })


});

app.put('/changePassword', bearer, (req, res, next) => {
    const { oldPassword, password, confirmPassword } = req.body;
    const loggedInUser = req.headers.loggedinuser

    checkTokenExpiry(req, res, () => {
        pool.query('SELECT * FROM adminuser WHERE userId = ?', [loggedInUser], (error, result) => {
            if (error) {
                res.status(500).json({ error: 'Internal Server Error' })
                return;
            }

            if (result.length > 0) {
                passwordValidations(req, res, () => {
                    hashPassword(password).then(hashed => {
                        comparePasswords(oldPassword, result[0].password).then(e => {
                            if (e === true) {
                                pool.query(
                                    'UPDATE adminuser SET password = ? WHERE userId = ?',
                                    [hashed, loggedInUser],
                                    (error, result) => {
                                        if (error) {
                                            console.error('Error updating user:', error);
                                            res.status(500).send('Internal Server Error');
                                        } else {
                                            res.status(200).send({ message: 'Password updated successfully' });
                                        }
                                    }
                                );
                            }
                            else {
                                res.status(401).json({ error: 'Old Password Didnot Match' });

                            }
                        })

                    });
                })
            } else {
                res.status(404).send({ error: 'User not found' });
            }
        })
    })

})

app.post('/logoutAdmin', bearer, (req, res) => {
    const username = req.headers.loggedinuser
    pool.query('SELECT * from adminuser where userId=?', [username], (error, result) => {
        if (error) {
            console.error('Error getting token', error);
            res.status(500).json({ error: 'Internal Server Error' })
        }
        if (result.length > 0) {
            const userId = result[0].userId
            pool.query('SELECT tkn from tkn_store where user=?', [userId], (err, tknStore) => {
                const tkn = tknStore[0].tkn
                if (err) {
                    res.status(500).json({ error: 'Internal Server Error' })
                }
                if (!tkn) {
                    res.status(409).json({ error: 'User already Logged out!' });

                } else {
                    pool.query('UPDATE tkn_store set tkn = ?  where user=?', ['', userId], (e, r) => {
                        if (e) {
                            res.status(500).json({ error: 'Internal Server Error' })
                        }
                    })
                    res.status(200).json({ success: 'User is Logged out' });
                }

            })

        } else {
            res.status(401).json({ error: 'Authentication failed' });

        }
    })
});

module.exports = app;