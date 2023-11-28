const express = require('express');
const mysql = require('mysql');
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const app = express();

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'my api db',
});
app.use(cors());
const itemsPerPage = 10;

const basicAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const encodedCredentials = authHeader.split(' ')[1];
        const credentials = Buffer.from(encodedCredentials, 'base64').toString('utf-8');
        const [username, password] = credentials.split(':');

        if (username === 'admin' && password === 'password') {
            return next();
        }
    }

    res.setHeader('WWW-Authenticate', 'Basic');
    res.status(401).send('Authentication required');
};

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, 'your-secret-key', (err, decoded) => {
            if (err) {
                reject(err); // Token verification failed
            } else {
                resolve(decoded); // Token verification successful
            }
        });
    });
}

const bearer = (req, res, next) => {

    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    verifyToken(token)
        .then((decoded) => {
            const uname = decoded.userId

            if (uname === req.headers.loggedinuser) {
                return next()
            } else {
                res.status(403).json({ error: 'Forbidden' })
            }
        })
        .catch((err) => {
            return res.status(401).json({ error: 'Invalid token' });
        });
}

const superPrivilege = (req, res, next) => {
    pool.query(`SELECT role FROM adminuser WHERE userId=?`, [req.headers.loggedinuser], (error, response) => {
        if (error) {
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        if (response.length > 0) {
            if (response[0].role === 69) {
                return next();
            } else {
                res.status(403).json({ error: 'Forbidden Request' });

            }
        } else {
            res.status(401).json({ error: "Logged in user not found" })
        }
    })
}

const passwordValidations = (req, res, next) => {
    const password = req.body.password
    const confirmPassword = req.body.confirmPassword
    if (password.length >= 8 && password.length <= 16) {
        if (password === confirmPassword) {
            next()
        } else {
            res.status(400).json({ error: 'Confirm Password did not match' })
        }
    } else {
        res.status(400).json({ error: 'Password length must be 8-16 characters' })

    }
}

const getCurrentUserId = (req, res, next) => {
    const user = req.headers.loggedinuser
    pool.query('SELECT userId from adminuser where userId = ?', [user], (error, result) => {
        if (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
        next()
        return (result)
    })
}
let userId

const adminVals = (req, res, next) => {
    pool.query(
        'SELECT * FROM adminuser WHERE userName = ? AND userId!=?',
        [req.body.userName, userId],
        (error, userNameResults) => {
            if (error) {
                console.error('Error checking userName uniqueness:', error);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            if (userNameResults.length > 0) {
                res.status(409).json({ error: 'userName already exists' });
                return;
            } else {
                pool.query(
                    'SELECT * FROM adminuser WHERE email = ? AND userId!=?',
                    [req.body.email, userId],
                    (error, emailResults) => {
                        if (error) {
                            console.error('Error checking email uniqueness:', error);
                            res.status(500).json({ error: 'Internal Server Error' });
                            return;
                        }
                        if (emailResults.length > 0) {
                            res.status(409).json({ error: 'email already exists' });
                            return;
                        } else {
                            next()
                        }
                    })
            }
        })
}

const adminValidations = (req, res, next) => {
    if (req.params.id) {
        userId = req.params.id
    } else {
        userId = ''
    }
    if (!req.body.role) {
        adminVals(req, res, next)
    }
    else {
        if (req.body.role === '1' || req.body.role === '69') {
            adminVals(req, res, next)
        } else {
            res.status(403).json({ error: 'Invalid Role' })
        }
    }


}

const checkTokenExpiry = (req, res, next) => {
    const username = req.headers.loggedinuser
    const authHeader = req.headers.authorization.slice(7);
    pool.query('SELECT * from adminuser where userId=?', [username], (error, result) => {
        if (error) {
            console.error('Error getting token', error);
            res.status(500).json({ error: 'Internal Server Error' })
        }
        if (result.length > 0) {
            const userId = result[0].userId
            pool.query('SELECT tkn from tkn_store where user=?', [userId], (error, result) => {
                if (error) {
                    res.status(500).json({ error: 'Internal Server Error' })
                }
                if (result[0].tkn === authHeader) {
                    if (result[0].tkn != '') {
                        pool.query('SELECT updateddate from tkn_store where user=?', [userId], (e, r) => {
                            if (e) {
                                res.status(500).json({ error: 'Internal Server Error' })
                            }
                            if (r.length > 0) {
                                const compareDate = Date.now() - r[0].updateddate;
                                const expiry = 60 * 60 * 1000
                                if (compareDate > expiry) {
                                    pool.query('UPDATE tkn_store set tkn = ?  where user=?', ['', userId], (e, r) => {
                                        if (e) {
                                            res.status(500).json({ error: 'Internal Server Error' })
                                        }
                                        res.status(401).json({ error: 'Session Expired' });
                                    })
                                } else {
                                    next()
                                }
                            } else {
                                res.status(401).json({ error: 'Authentication failed' });
                            }
                        })
                    } else {
                        res.status(401).json({ error: 'Please Login to continue...' });
                    }
                } else {
                    res.status(401).json({ error: 'Token Expired' });
                }

            })
        } else {
            res.status(401).json({ error: 'User not found' });

        }
    })
}

function checkUserRole(req, res, next) {
    const userId = req.headers.loggedinuser;

    pool.query('SELECT role FROM adminuser WHERE userId = ?', [userId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server error' });
        }

        if (result.length === 0) {
            return res.status(401).json({ message: 'User not found' });
        }

        const userRole = result[0].role;

        if (userRole === 69) {
            req.isAdmin = 1;
        } else {
            req.isAdmin = 0;
        }

        next();
    });
}

async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        console.error(error);
    }
}

async function comparePasswords(password, hashedPassword) {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        if (isMatch) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);
    }
}

module.exports = { itemsPerPage, app, pool, basicAuth, bearer, adminValidations, superPrivilege, passwordValidations, checkTokenExpiry, checkUserRole, hashPassword, comparePasswords };
