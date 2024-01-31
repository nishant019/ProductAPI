const functions = require('../functions/scripts')
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
        const featureId = req.params.featureId;
        const uploadPath = `api servers/uploads/features/${featureId}`;

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
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/gif'
    ) {
        cb(null, true);
    } else {
        cb('Only images are allowed!', false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

function deleteFeatureImage(imageUrl, replacedUrl, res, loggedInUser) {
    pool.query('SELECT featureId FROM featureimage WHERE imageUrl = ?', [imageUrl], (err, response) => {
        if (err) {
            return res.status(500).send('Internal Server Error');
        } else {

            pool.query('DELETE FROM featureimage WHERE imageUrl = ?', [imageUrl], (error, result) => {
                if (error) {
                    console.error('Error deleting image from database:', error);
                    return res.status(500).send('Internal Server Error');
                }

                fs.unlink(replacedUrl, (err) => {
                    if (err) {
                        console.error('Error deleting image file:', err);
                        return res.status(500).send('Internal Server Error');
                    }
                    pool.query('UPDATE features set updateddate = ? , updatedby = ? where featureId=?', [Date.now(), loggedInUser, response[0].featureId], (error, result) => {

                    })
                    return res.status(200).send({ message: 'Image deleted successfully' });
                });
            });
        }
    })

}

app.post('/featureUploadImage/:featureId', bearer, upload.array('featureImage', 5), (req, res) => {
    const featureId = req.params.featureId;
    const loggedInUser = req.headers.loggedinuser;
    const uploadedImages = req.files;

    if (!uploadedImages || uploadedImages.length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    pool.query('SELECT createdby FROM features WHERE featureId = ?', [featureId], (error, result) => {
        if (error) {
            console.error('Error checking user privileges:', error);
            return res.status(500).send('Internal Server Error');
        }

        if (result.length === 0 || result[0].createdby.toString() !== loggedInUser.toString()) {
            return res.status(403).send('Unauthorized - Insufficient privileges to upload images for this product.');

        }

        const imageTable = uploadedImages.map(file => {
            const imageUrl = `/featureImage/${featureId}/${file.filename}`; // Adjust the URL/path as needed
            createddate = Date.now();
            return {
                featureId,
                imageUrl,
                createddate,
                createdby: loggedInUser,
            };
        });

        pool.query('UPDATE features set updateddate = ? , updatedby = ? where featureId=?', [Date.now(), loggedInUser, featureId], (error, result) => {
            if (error) {
                res.status(500).send('Internal Server Error');
                console.log(error)
            } else {
                pool.query('INSERT INTO featureimage (featureId, imageUrl, createddate, createdby) VALUES ?', [imageTable.map(e => Object.values(e))], (error, result) => {
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


app.get('/featureImage/:featureId/:imageName', (req, res) => {
    const { featureId, imageName } = req.params;
    const imagePath = path.join(__dirname, '..', 'uploads/features', featureId, imageName);
    try {
        if (fs.existsSync(imagePath)) {
            res.sendFile(imagePath);
        } else {
            res.status(404).send('Image not found');
        }
    } catch (error) {
        console.error('Error sending image:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/featureImages/:featureId', (req, res) => {
    const { featureId } = req.params;
    pool.query('SELECT imageUrl FROM featureimage WHERE featureId = ?', [featureId], (error, result) => {
        if (error) {
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        } else {
            res.status(200).send({ result });

        }
    })
})

app.delete('/deleteFeatureImage/:imageUrl', bearer, (req, res, next) => {
    const encodedImgURl = req.params.imageUrl;
    const imageUrl = decodeURIComponent(encodedImgURl);
    const loggedInUser = req.headers.loggedinuser;
    const replacedUrl = imageUrl.replace('/featureImage', '/uploads/features');
    const imagePath = path.join(__dirname, '..', replacedUrl);
    checkTokenExpiry(req, res, () => {
        pool.query('SELECT role FROM adminuser WHERE userId = ?', [loggedInUser], (error, result) => {
            if (error) {
                console.error('Error retrieving user role:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            if (result.length > 0 && result[0].role === 69) {
                deleteFeatureImage(imageUrl, imagePath, res, loggedInUser);
            } else {
                pool.query('SELECT p.user FROM featureimage pi JOIN features p ON pi.featureId = p.featureId WHERE pi.imageUrl = ?', [imageUrl], (error, result) => {
                    if (error) {
                        console.error('Error retrieving image details:', error);
                        return res.status(500).send('Internal Server Error');
                    }
                    console.log(result)
                    if (result.length > 0 && result[0].user === loggedInUser) {
                        deleteFeatureImage(imageUrl, imagePath, res, loggedInUser);
                    } else {
                        return res.status(403).send({ error: 'Unauthorized - Insufficient privileges' });
                    }
                });
            }
        });
    });
});

module.exports = app;