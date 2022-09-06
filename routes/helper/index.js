const createError = require('http-errors');
const jwt = require('jsonwebtoken')
const ReadEnv = require("../../utils/readEnv").ReadEnv
const readEnv = new ReadEnv();
exports.createError = createError;
const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers['authorization']
        if(!token) return res.status(401).json('Unauthorize')
        const decode = await jwt.verify(token.split(' ')[1], readEnv.get("JWT_SECRET"))
        req.user = decode
        next()
    } catch (error) {
      next(error)
    }
}
exports.projectName = process.env.npm_package_name;
exports.auth = verifyToken