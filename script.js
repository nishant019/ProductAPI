const express = require('express');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs')
// const axios = require('axios');
const cors = require('cors'); // Import the cors middleware

const bcrypt = require('bcrypt')
const app = express();
const itemsPerPage = 10;
let token
app.use(cors());

// Create a pool pool
const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'my api db',
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const prodId = req.params.prodId;
    const uploadPath = `uploads/${prodId}`;

    fs.access(uploadPath, (err) => {
      if (err) {
        fs.mkdir(uploadPath, { recursive: true }, (err) => {
          if (err) {
            console.error('Error creating folder:', err);
            cb(err, null);
          } else {
            cb(null, uploadPath);
          }
        });
      } else {
        cb(null, uploadPath);
      }
    });
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
  }
})

const upload = multer({ storage: storage });

app.post('/uploadImage/:prodId', bearer, upload.array('prodImage', 5), (req, res) => {
  const prodId = req.params.prodId;
  const loggedInUser = req.headers.loggedinuser;
  const uploadedImages = req.files; // Access the uploaded image using req.file

  if (!uploadedImages || uploadedImages.length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // Check if the logged-in user is authorized to upload images for the provided prodId
  pool.query('SELECT user FROM prods WHERE prodId = ?', [prodId], (error, result) => {
    if (error) {
      console.error('Error checking user privileges:', error);
      return res.status(500).send('Internal Server Error');
    }

    if (result.length === 0 || result[0].user !== loggedInUser) {
      return res.status(403).send('Unauthorized - Insufficient privileges to upload images for this product.');
    }

    const imageTable = uploadedImages.map(file => {
      const imageUrl = `/image/${prodId}/${file.filename}`; // Adjust the URL/path as needed
      createddate = Date.now();
      return {
        prodId,
        imageUrl,
        createddate,
        createdby: loggedInUser,
      };
    });
    pool.query('UPDATE prods set updateddate = ? , updatedby = ? where prodId=?', [Date.now(), loggedInUser, prodId], (error, result) => {
      if (error) {
        res.status(500).send('Internal Server Error');
      } else {
        pool.query('INSERT INTO productImages (prodId, imageUrl, createddate, createdby) VALUES ?', [imageTable.map(e => Object.values(e))], (error, result) => {
          if (error) {
            console.error('Error uploading image:', error);
            res.status(500).send('Internal Server Error');
          } else {
            res.status(200).send({ message: 'Image uploaded successfully', imageTable });
          }
        });
      }
    });


  });
});



app.get('/image/:prodId/:imageName', (req, res) => {
  const { prodId, imageName } = req.params;
  const imagePath = path.join(__dirname, 'uploads', prodId, imageName);

  if (fs.existsSync(imagePath)) {
    res.sendFile(imagePath);
  } else {
    res.status(404).send('Image not found');
  }
});



app.get('/prodImage/:prodId', (req, res) => {
  const { prodId, imageName } = req.params;
  pool.query('SELECT imageUrl FROM productimages WHERE prodId = ?', [prodId], (error, result) => {
    if (error) {
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    } else {
      res.status(200).send({ result });

    }
  })
})

app.delete('/deleteImage/:imageUrl', bearer, (req, res, next) => {
  const encodedImgURl = req.params.imageUrl;
  const imageUrl = decodeURIComponent(encodedImgURl);
  const loggedInUser = req.headers.loggedinuser;
  const replacedUrl = imageUrl.replace('/image', '/uploads');
  const imagePath = path.join('D:', 'productapi', replacedUrl);

  checkTokenExpiry(req, res, () => {
    pool.query('SELECT role FROM adminuser WHERE userId = ?', [loggedInUser], (error, result) => {
      if (error) {
        console.error('Error retrieving user role:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (result.length > 0 && result[0].role === 69) {
        deleteImage(imageUrl, imagePath, res, loggedInUser);
      } else {
        pool.query('SELECT p.user FROM productimages pi JOIN prods p ON pi.prodId = p.prodId WHERE pi.imageUrl = ?', [imageUrl], (error, result) => {
          if (error) {
            console.error('Error retrieving image details:', error);
            return res.status(500).send('Internal Server Error');
          }
          console.log(result)
          if (result.length > 0 && result[0].user === loggedInUser) {
            deleteImage(imageUrl, imagePath, res, loggedInUser);
          } else {
            return res.status(403).send({ error: 'Unauthorized - Insufficient privileges' });
          }
        });
      }
    });
  });
});

function deleteImage(imageUrl, replacedUrl, res, loggedInUser) {
  pool.query('SELECT prodId FROM productimages WHERE imageUrl = ?', [imageUrl], (err, response) => {
    if (err) {
      return res.status(500).send('Internal Server Error');
    } else {

      pool.query('DELETE FROM productimages WHERE imageUrl = ?', [imageUrl], (error, result) => {
        if (error) {
          console.error('Error deleting image from database:', error);
          return res.status(500).send('Internal Server Error');
        }

        fs.unlink(replacedUrl, (err) => {
          if (err) {
            console.error('Error deleting image file:', err);
            return res.status(500).send('Internal Server Error');
          }
          pool.query('UPDATE prods set updateddate = ? , updatedby = ? where prodId=?', [Date.now(), loggedInUser, response[0].prodId], (error, result) => {

          })
          return res.status(200).send({ message: 'Image deleted successfully' });
        });
      });
    }
  })

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

app.post('/addProds', bearer, (req, res) => {
  const user = req.headers.loggedinuser
  const { prodName, prodLocation, prodLocation1, prodLocation2, prodImage, prodTitle, prodDescription } = req.body;
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
        const productTable = { prodId, prodName, prodLocation, prodLocation1, prodLocation2, prodImage, prodTitle, prodDescription, user, createddate, updateddate };

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
  const {
    prodName,
    prodLocation,
    prodLocation1,
    prodLocation2,
    prodImage,
    prodTitle,
    prodDescription,
  } = req.body;
  const updatedBy = loggedInUser;
  const updateddate = Date.now();
  const productTable = {
    prodId,
    prodName,
    prodLocation,
    prodLocation1,
    prodLocation2,
    prodImage,
    prodTitle,
    prodDescription,
    updateddate,
    updatedBy,
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

        const imagePath = path.join('D:', 'productapi', 'uploads', prodId,urlParts[3]);

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


app.get('/getProds/:id', bearer, checkUserRole, (req, res) => {
  const prodId = req.params.id;
  const userId = req.headers.loggedinuser;
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * itemsPerPage;
  let sql, dataCountSql, queryParams;

  checkTokenExpiry(req, res, () => {
    if (prodId === ':id') {
      sql = req.isAdmin === 1 ? 'SELECT * FROM prods LIMIT ? OFFSET ?' : 'SELECT * FROM prods WHERE user = ? LIMIT ? OFFSET ?';
      dataCountSql = req.isAdmin === 1 ? 'SELECT COUNT(*) as total FROM prods' : 'SELECT COUNT(*) as total FROM prods WHERE user = ?';
      queryParams = req.isAdmin === 1 ? [itemsPerPage, offset] : [userId, itemsPerPage, offset];
    } else {
      sql = req.isAdmin === 1 ? 'SELECT * FROM prods WHERE prodId = ? LIMIT ? OFFSET ?' : 'SELECT * FROM prods WHERE user = ? AND prodId = ? LIMIT ? OFFSET ?';
      dataCountSql = req.isAdmin === 1 ? 'SELECT COUNT(*) as total FROM prods WHERE prodId = ?' : 'SELECT COUNT(*) as total FROM prods WHERE user = ? AND prodId = ?';
      queryParams = req.isAdmin === 1 ? [prodId, itemsPerPage, offset] : [userId, prodId, itemsPerPage, offset];
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



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});