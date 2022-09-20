
const jwt = require('jsonwebtoken')
const ReadEnv = require("../../utils/readEnv").ReadEnv
const {query,checkSchema,validationResult} = require('express-validator');
const readEnv = new ReadEnv();
const createError = require('http-errors');
exports.createError = createError;
const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers['authorization']
        console.log(req.headers['authorization'])
        if(!token) return res.status(401).json('Unauthorized')
        const decode = await jwt.verify(token.split(' ')[1], readEnv.get("JWT_SECRET"))
        req.user = decode
        next()
    } catch (error) {
      next(error)
    }
}
const queryValid = [
    query('limit').toInt(10),
    query('offset').toInt(10),
  ];
const after = (req, res, next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({error: errors.array()});
    } else {
      if (req.method=='PUT') {
        delete req.body._id;
        delete req.body.__v;
      }
      next();
    }
  };
exports.after = after
exports.schemaCek = checkSchema;
exports.projectName = process.env.npm_package_name;
exports.auth = verifyToken
exports.queryCek = queryValid