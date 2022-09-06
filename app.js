const express = require('express')
const path = require('path');
const cors = require('cors')
const fs = require("fs");
var logger = require('morgan');
// const https = require("https");
// const PORT_BACKEND = readEnv.get("PORT_BACKEND") || 5000
const staticFile = 'public';
const app = express();
app.use(logger('dev'));
app.use(express.json({
    limit: '50mb'
}));
app.use(express.urlencoded({
    extended: true,
    limit: '50mb'
}));
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
app.all('/*', (req, res, next) => {
    res.sendFile('index.html', {root: staticFile});
})
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
module.exports = app;