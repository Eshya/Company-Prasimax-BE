const express = require('express')
const router = express.Router()
const c = require('./provincepostal.controller')
const {auth,after, queryCek} = require('../../helper');
router.get('/',auth,queryCek,c.findProvinsi)
router.get('/postal',auth,queryCek,c.findPostal)
module.exports = router