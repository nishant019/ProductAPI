const functions = require('./functions/scripts')
const express = require('express')

const pool = functions.pool
const app = functions.app
const bearer = functions.bearer
const checkTokenExpiry = functions.checkTokenExpiry
const fs = require('fs')
const multer = require('multer');
const path = require('path');

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

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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

app.post('/uploadImage/:prodId', bearer, upload.array('prodImage', 5), (req, res) => {
    const prodId = req.params.prodId;
    const loggedInUser = req.headers.loggedinuser;
    const uploadedImages = req.files; // Access the uploaded image using req.file

    if (!uploadedImages || uploadedImages.length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    
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

module.exports = app;