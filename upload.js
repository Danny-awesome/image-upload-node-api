const multer = require('multer');
const express = require('express');
const router = express.Router();

const crypto = require('crypto');
const path = require('path');

const file_path = 'public/images/uploads';
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, file_path)
    },
    filename: function (req, file, callback) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            if (err) return callback(err);

            callback(null, raw.toString('hex') + path.extname(file.originalname));
        });
    }
});
const upload = multer({
    storage: storage
});

router.post('/', upload.single('image'), async (req, res, next) => {
    if (!req.file) return res.status(400).send({
        message: 'upload failed'
    });

    res.json({
        message: 'upload successfull',
        image_url: `${req.hostname}/${req.file.path}`
    });
});


module.exports = router;