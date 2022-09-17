
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

    client.on('newMessage', (payload) => {
        //console.log('New message', payload);
        //io.emit('newMessage', payload); // Emit newMessage to all clients
        client.broadcast.emit('newMessage', payload); // Emit newMessage to all clients except the one that sent it
    }); // Listen for newMessage

}); // Listen for connection