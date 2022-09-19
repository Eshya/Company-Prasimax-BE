const express = require('express')
const router = express.Router()
const {auth,after, queryCek} = require('../../helper');
const c = require('./carousel.controller')
router.get('/',auth,queryCek,c.findAll)
router.get('/:id',auth,queryCek,c.findById)
router.post('/',auth,after,c.uploadImg,c.createData)
router.put('/',auth,after,c.updateById)
router.delete('/:id',auth,queryCek,c.removeById)
module.exports = router