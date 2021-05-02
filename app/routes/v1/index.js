const express = require('express');
const router = express.Router();

router.use('/user', require('./user'));
router.use('/ebooks', require('./education/ebook'));

router.use('/threads', require('./community/threads'));
router.use('/channel', require('./community/channel'));
module.exports = router;