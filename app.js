const express = require('express')
const path = require('path');
const cors = require('cors')
const fs = require("fs");
var logger = require('morgan');
const compression = require('compression');
var cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const SessionStore = require('express-session-sequelize')(session.Store);
const db = require('./config/db.config')
const {projectName} = require('./routes/helper');
const debug = require('debug')(`${projectName}:static`);
// const https = require("https");
// const PORT_BACKEND = readEnv.get("PORT_BACKEND") || 5000
const staticFile = 'public';
const app = express();
const sequelizeSessionStore = new SessionStore({
    db: db.sequelize,
});
app.use(logger('dev'));
app.use(express.json({
    limit: '50mb'
}));
app.use(express.urlencoded({
    extended: true,
    limit: '50mb'
}));
app.use(cookieParser());
app.use(session({
    secret: 'bolokasloidhoihpihpasiht',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 60 * 6},
    store: sequelizeSessionStore,  
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(require('./routes'));
app.use(express.static(path.join(__dirname, staticFile)));
// var options = {
//     key: fs.readFileSync(path.resolve(__dirname, '..', 'config','key.pem')),
//     cert: fs.readFileSync(path.resolve(__dirname, '..', 'config','cert.pem')),
// };
// app.use(cors());
// app.use('/api', require('./router/router.js'));
// const serverBackend = https.createServer(options, app);
// serverBackend.listen(PORT_BACKEND, function(){
//     console.log("Express Backend listening on port third Commit" + PORT_BACKEND);
// });

app.use((err, req, res, next) => {
    console.log(err)
    // if (process.env.NODE_ENV === 'development') {
    //     if (err.name == 'MongoError') {
    //         console.error({
    //             message: err.errmsg
    //         });
    //     } else {
    //         console.error(err);
    //     }
    // }
    // if (err.status && err.status !== 500) {
    //     res.status(err.status).send(err);
    // } else {
    //     res.status(500).send({
    //         message: 'Internal Server Error'
    //     });
    // }
});
if (!fs.existsSync(`${process.cwd()}/upload/carousel`)){
    fs.mkdirSync(`${process.cwd()}/upload/carousel`,{recursive:true});
}
if (!fs.existsSync(`${process.cwd()}/upload/product`)){
    fs.mkdirSync(`${process.cwd()}/upload/product`,{recursive:true});
}
if (!fs.existsSync(`${process.cwd()}/upload/titleabout`)){
    fs.mkdirSync(`${process.cwd()}/upload/titleabout`,{recursive:true});
}
if (!fs.existsSync(`${process.cwd()}/upload/technical`)){
    fs.mkdirSync(`${process.cwd()}/upload/technical`,{recursive:true});
}
if (!fs.existsSync(`${process.cwd()}/upload/service`)){
    fs.mkdirSync(`${process.cwd()}/upload/service`,{recursive:true});
}
const files = fs.readdirSync(`${__dirname}/upload`);
files.forEach((static)=>{
      debug(static);
      app.use(`/upload/${static}`,express.static(path.resolve(__dirname,'upload',static)));

});
app.all('/*', (req, res, next) => {
    res.sendFile('index.html', {root: staticFile});
})
module.exports = app;