const userController = require('../../../controllers/user/user.controller');
const auth = require('../../../middlewares/authentication/auth.user');
const express = require('express');
const router = express.Router();
const upload = require('../../../middlewares/multer');

// Registrar
router.post('/register', userController.register);
// Login
router.post('/login', userController.login);
// Activation
router.get('/resendActivation/:email', userController.reSendEmailConfirmation);
router.post('/activation', userController.activation);
// Recovery Account
router.get('/accountRecovery/:id', userController.sendAccountRecovery);
// Atualizar perfil
router.put('/profile', [auth], userController.store);
// Profile
router.get('/profile', [auth], userController.current);
// Remove Account
router.delete('/:id', [auth], userController.deleteAccount);

// Profile photo
router.post('/profile/photo', [auth, upload.single("file", () => {
    filename: (req, file, cb) => {
        const { user } = req;
        const token = jwt.sign({ id: user.email }, process.env.auth_userkey);
        cb(null, token);
    }
})], userController.uploadProfilePhoto);

module.exports = router;