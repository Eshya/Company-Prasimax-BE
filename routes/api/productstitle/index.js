const express = require('express')
const router = express.Router()
const c = require('./productstitle.controller')
const {auth,after, queryCek} = require('../../helper');
router.get('/',auth,queryCek,c.findAll)
router.get('/:id',auth,queryCek,c.findById)
router.post('/',auth,after,c.createData)
router.delete('/:id',auth,queryCek,c.removeById)
module.exports = router