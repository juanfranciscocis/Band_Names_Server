
const {io} = require('../index');
const Bands = require("../models/bands");
const Band = require("../models/band");

const bands = new Bands(); // Create new Bands class
console.log('init socket'); // Log that the socket has been initialized

bands.addBand(new Band('Queen')); // Add a new band
bands.addBand(new Band('Quevedo')); // Add a new band
bands.addBand(new Band('Metalica')); // Add a new band
bands.addBand(new Band('Linton')); // Add a new band

//SOCKET MESSAGES
io.on('connection', client => {
    console.log('Client connected...');

    client.emit('active-bands', bands.getBands()); // Emit active bands

    client.on('vote-band', (payload) => {
        //console.log(payload);
        bands.voteBand(payload.id); // Vote for a band
        io.emit('active-bands', bands.getBands()); // Emit active bands
    });

    client.on('add-band', (payload) => {
        bands.addBand(new Band(payload.name)); // Add a new band
        io.emit('active-bands', bands.getBands()); // Emit active bands
    });

    client.on('delete-band', (payload) => {
        bands.deleteBand(payload.id); // Delete a band
        io.emit('active-bands', bands.getBands()); // Emit active bands
    });

    client.on('disconnect', () => {
        console.log('User disconnected');
    }); // Listen for disconnect

/*    client.on('mensaje',(payload)=>{
        console.log('Mensaje recibido',payload);
        io.emit('mensaje',{admin:'LO RECIBI!!!'});
    })

    client.on('newMessage', (payload) => {
        //console.log('New message', payload);
        //io.emit('newMessage', payload); // Emit newMessage to all clients
        client.broadcast.emit('newMessage', payload); // Emit newMessage to all clients except the one that sent it
    }); // Listen for newMessage*/

}); // Listen for connection