const express = require('express');
const router = express.Router();

router.use('/robots', require('./robots.js'))

module.exports = router;