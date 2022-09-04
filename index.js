
const express = require('express'); // Import express
const path = require('path'); // Import path
require('dotenv').config(); // Import dotenv


const app = express(); // Create express app
//NODE SERVER
const server = require('http').createServer(app);// Create server
module.exports.io = require('socket.io')(server); // Export io
require('./sockets/socket.js'); // Import socket



//public path
const publicPath = path.join(__dirname, 'public');//path to public folder

app.use(express.static(publicPath)); //use public folder

server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err); // If there is an error, throw it
    console.log('Server started on port', process.env.PORT); // If there is no error, log that the server has started
}); // Start express server