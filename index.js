//node srever to handle socket.io

const io=require('socket.io')(8000);
//[connection,user-joinded..these are the events to be listened]
const users={};
io.on('connection',socket=>{//this is socket.io instance
    socket.on('new-user-joined',name=>{//it handles the function with the particular connection
       users[socket.id]=name;
      
       socket.broadcast.emit('user-joined',name);
    });

    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message: message,name:users[socket.id]});

    });

    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });
});