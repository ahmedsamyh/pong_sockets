const express = require('express');
const app = express();


// start listening to localhost
const port = process.env.PORT || 80;
const server = app.listen(port, () => console.log(`Started listening on http://localhost:${port}`));

// host all the files in public
app.use(express.static('public'));

// import socket.io
const socket = require('socket.io');
// connect the socket to the server
const io = socket(server);

io.on('connection', socket => {
    console.log(`new connection: ${socket.id}`);

    socket.on('create_room', (data)=>{
        console.log(`${socket.id} requested to create room: ${data.room_name}`);
    })

    socket.on('data_ts', (data) => {
        data.id = socket.id;
        socket.broadcast.emit('data_tc', data);

        //console.log(`recieving data: ${data.y} from: ${socket.id}`);
    });
    // console.log(connections);
});