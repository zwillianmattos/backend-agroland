const controller = require('../../../controllers/upload/upload.controller');
const auth = require('../../../middlewares/authentication/auth.user');
const express = require('express');
const upload = require('../../../middlewares/multer');
const router = express.Router();

// Enviar fotos do anuncio
router.post('/document', [auth, upload.single("file", () => {
    filename: (req, file, cb) => {
        const { user } = req;
        const token = jwt.sign({ id: user.email }, process.env.auth_userkey);
        cb(null, token);
    }
})], controller.uploadPhotos);


module.exports = router;