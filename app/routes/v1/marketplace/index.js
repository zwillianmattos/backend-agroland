const controller = require('../../../controllers/marketplace/marketplace.controller');
const auth = require('../../../middlewares/authentication/auth.user');
const upload = require('../../../middlewares/multer');
const express = require('express');
const router = express.Router();


// Adicionar anuncios
router.post('/announce', [auth], controller.create);

// Editar anuncios
router.put('/announce/:announceId', [auth], controller.update);

// Editar anuncios
router.get('/announce/:announceId', [auth], controller.get);

// Enviar fotos do anuncio
router.post('/announce/:announceId/upload', [auth, upload.single("file", () => {
    filename: (req, file, cb) => {
        const { user } = req;
        const token = jwt.sign({ id: user.email }, process.env.auth_userkey);
        cb(null, token);
    }
})]
    , controller.uploadProductPhotos);

// Ver anuncios da loja
router.get('/announces', [auth], controller.getAll);



module.exports = router;