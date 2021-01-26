const express = require('express');
const path = require('path');
require('dotenv').config();


const app = express();

const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

const serverPort = process.env.PORT;

// Public Path
const publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));

server.listen(serverPort, (err) => {
    if (err) throw new Error(err);
    console.log(`Server running on port ${serverPort}`);
});