const express = require('express');
const router = express.Router();
const {projectName, createError} = require('../helper');
const debug = require('debug')(`${projectName}:api`);

const fs = require('fs');
const files = fs.readdirSync(__dirname);

router.get('/', (req, res, next)=>{
    res.send(createError(401, `You're not allowed`));
});

module.exports = router;