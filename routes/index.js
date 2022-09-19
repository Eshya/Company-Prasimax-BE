const express = require('express');
const router = express.Router();

router.use('/company-be/api', require('./api'))
router.use('/company-be/auth', require('./auth'))
module.exports = router;