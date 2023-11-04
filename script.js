const express = require('express');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
// const axios = require('axios');
const cors = require('cors'); // Import the cors middleware

const bcrypt = require('bcrypt')
const app = express();
let token
app.use(cors());

// Create a pool pool
const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'my api db',
});

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
                    console.log(e)
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

app.use(express.json()); // Parse JSON request bodies

app.post('/login', basicAuth, (req, res) => {
  let date = Date.now()
  let tkn = ''
  let user = ''
  let dbData = ''

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
                    pool.query('INSERT INTO tkn_store SET ?,', dbData, (error, result) => {
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

app.get('/getUsers/:id', bearer, superPrivilege, (req, res) => {
  const userId = req.params.id
  console.log(userId)
  checkTokenExpiry(req, res, () => {
    if (userId === ':id') {
      pool.query('SELECT * FROM adminuser', (error, result) => {
        res.status(200).json({ users: result })
        if (error) {
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
      })
    } else {
      pool.query('SELECT * FROM adminuser WHERE userId=?', [userId], (error, result) => {
        res.status(200).json({ users: result })
        if (error) {
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
      })
    }
  })
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

//own info update
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
      console.log(req.params.id)
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
          console.log(oldPassword, result[0].password)
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

// app.post('/addProds', bearer, (req, res) => {
//   const { prodId, prodName, prodLocation, prodImage, prodTitle, prodDescription, user } = req.body;
//   pool.query(`SELECT role FROM adminuser WHERE userName=?`, [req.headers.loggedinuser], (error, response) => {
//     if (error) {
//       res.status(500).json({ error: 'Internal Server Error' });
//       return;
//     }
//     if (response[0].role === 69) {
//       pool.query(
//         'SELECT * FROM adminuser WHERE userName = ?',
//         [userName],
//         (error, userNameResults) => {
//           // console.log(userNameResults[0].role)
//           if (error) {
//             console.error('Error checking username uniqueness:', error);
//             res.status(500).json({ error: 'Internal Server Error' });
//             return;
//           }
//           if (userNameResults.length > 0) {
//             res.status(409).json({ error: 'Username already exists' });
//             return;
//           }

//           pool.query(
//             'SELECT * FROM adminuser WHERE email = ?',
//             [email],
//             (error, emailResults) => {
//               if (error) {
//                 console.error('Error checking email uniqueness:', error);
//                 res.status(500).json({ error: 'Internal Server Error' });
//                 return;
//               }
//               if (emailResults.length > 0) {
//                 res.status(409).json({ error: 'Email already exists' });
//                 return;
//               }
//               hashPassword(password).then(e => {
//                 const adminUser = { userName, password, email, role, status, fullName, userId };
//                 adminUser.password = e
//                 pool.query('SELECT MAX(userId) as last FROM adminuser', (e, r) => {
//                   adminUser.userId = r[0].last++ + 1;
//                   pool.query('INSERT INTO adminuser SET ?', adminUser, (error, result) => {

//                     if (error) {
//                       console.error('Error inserting admin user:', error);
//                       res.status(500).json({ error: 'Internal Server Error' });
//                     } else {


//                       res.status(201).json({ message: 'Admin user created successfully' });
//                     }
//                   });
//                 })


//               })
//             }
//           );
//         }
//       );
//     } else {
//       res.status(401).json({ error: 'Unauthorized Request' });;
//     }
//   })
// });

//own user info
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
const itemsPerPage = 10;
app.get('/getAdminUsers', bearer, superPrivilege, (req, res) => {
  const userId = req.headers.loggedinuser

  const page = parseInt(req.query.page) || 1; // Get the requested page number
  const offset = (page - 1) * itemsPerPage; // Calculate the offset
  const sql = 'SELECT * FROM adminuser LIMIT ? OFFSET ?'; // SQL query to retrieve data
  checkTokenExpiry(req, res, () => {
    if (userId === ':id') {
      pool.query('SELECT * FROM adminuser', (error, result) => {
        res.status(200).json({ users: result })
        if (error) {
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
      })
    } else {
      pool.query(sql, [itemsPerPage, offset], (error, results) => {
        if (error) {
          console.error('Error executing SQL query:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          // Fetch the total count of records
          pool.query('SELECT COUNT(*) as total FROM adminuser', (error, totalCountResult) => {
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
    }
  })


});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});