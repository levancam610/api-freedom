const app = require('./app')
const http = require('http');
/*const https = require('https');
var fs = require('fs')*/
const port = process.env.PORT || 5000
/*https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
}, app)
    .listen(port, function () {
        console.log('Example app listening on port 3000! Go to' +port)
    })*/

const server = http.createServer(app);
server.listen(port);
