
const {io} = require('../index'); // Import socket.io

//SOCKET MESSAGES
io.on('connection', client => {
    console.log('Client connected...');
    client.on('disconnect', () => {
        console.log('User disconnected');
    }); // Listen for disconnect

    client.on('mensaje',(payload)=>{
        console.log('Mensaje recibido',payload);
        io.emit('mensaje',{admin:'LO RECIBI!!!'});
    })

}); // Listen for connection