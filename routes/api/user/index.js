const express = require('express')
const router = express.Router()
const schema = require('./user.validation')
const {auth,after, schemaCek, queryCek} = require('../../helper');
const c = require('./user.controller');
// router.post('/',auth, schemaCek(schema), after, c.insert);
router.post('/signup', schemaCek(schema), after, c.register);
router.get('/',auth, queryCek, c.findAll);
router.get('/:id',auth, queryCek, c.findId);
router.delete('/:id',auth,queryCek,c.removeById)
module.exports = router