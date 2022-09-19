const passport = require('passport')
const initModels = require("../routes/model/init-models");
const ReadEnv = require("../utils/readEnv").ReadEnv
const readEnv = new ReadEnv();
const db = require('../config/db.config')
const BasicStrategy = require('passport-http').BasicStrategy
const passportJWT = require('passport-jwt')
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt
const UserCtrl = require('../routes/api/user/user.controller');
const User = initModels(db.sequelize).user

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((obj, done) => {
    done(null, obj);
});
passport.use(new BasicStrategy(async (username, passwd, done) => {
    try {
        const user = await UserCtrl.login(username, passwd);
        return done(null, user, {
            message: 'Logged In Successfully'
        });
    } catch (err) {
        return done(err, null);
    }
}));
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: readEnv.get("JWT_SECRET"),
}, async ({
    username
}, done) => {
    try {
        const users = await User.findOne({
            where:{
                username:username
            }  
        });
        return done(null, users);
    } catch (err) {
        return done(err, null);
    }
}));
module.exports = passport