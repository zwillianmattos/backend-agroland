const express = require('express');
const router = express.Router();

router.use('/user', require('./user'));
router.use('/producer_user', require('./producer_user'));
router.use('/marketplace', require('./marketplace'));
router.use('/ebooks', require('./education/ebook'));
router.use('/threads', require('./community/threads'));
router.use('/channel', require('./community/channel'));
router.use('/news', require('./news'));
router.use('/finances', require('./finances'));
router.use('/cultures', require('./cultures'));
module.exports = router;