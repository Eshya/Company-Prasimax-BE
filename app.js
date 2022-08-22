const ReadEnv = require("./utils/readEnv").ReadEnv
const readEnv = new ReadEnv();
const express = require('express')
const path = require('path');
const cors = require('cors')
const fs = require("fs");
const https = require("https");
const PORT_BACKEND = readEnv.get("PORT_BACKEND") || 5000

const app = express();
var options = {
    key: fs.readFileSync(path.resolve(__dirname, '..', 'config','key.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, '..', 'config','cert.pem')),
};
app.use(cors());
app.use('/api', require('./router/router.js'));
const serverBackend = https.createServer(options, app);
serverBackend.listen(PORT_BACKEND, function(){
    console.log("Express Backend listening on port Second Commit" + PORT_BACKEND);
});