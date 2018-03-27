const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users;

app.use(express.static(publicPath));



io.on('connection', (socket)=>{
	console.log('New user connected');

	// socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app')); //just the sender and server

	// socket.broadcast.emit('newMessage', generateMessage('Admin','New user joined')) //all user, not sender



	socket.on('join',(params,callback)=>{
		if(!isRealString(params.name) || !isRealString(params.room))
		{
			return callback('Name and room name are required');
		}

		

		socket.join(params.room);
		//socket.leave(params.room)
		users.removeUser(socket.id); //just to make sure nothing will save with the same id
		users.addUser(socket.id, params.name, params.room);

		io.to(params.room).emit('updateUserList', users.getUserList(params.room));
		socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app')); //just the sender and server
		socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin',`${params.name} has joined`)) //all user, not sender

		callback();

	});



	//io.emit - emits an event to every single connection including the sender
	socket.on('createMessage',(message,callback)=>{		
		var user = users.getUser(socket.id);
		if(user && isRealString(message.text)){
			io.to(user.room).emit('newMessage', generateMessage(user.name,message.text));
		}
		
		callback();
	});

	socket.on('createLocationMessage', (coords)=>{
		var user = users.getUser(socket.id);
		if(user){
			io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name,coords.latitude,coords.longitude));
		}
		
	});

	socket.on('disconnect', ()=>{
		var user = users.removeUser(socket.id);

		if(user){
			io.to(user.room).emit('updateUserList', users.getUserList(user.room));
			io.to(user.room).emit('newMessage', generateMessage('Admin',`${user.name} has left the room`));
		}

	});
});
// socket.emit create event that client will listen to. THat will be inside connect callback function
// socket.on event listener from client

server.listen(port, ()=>{
	console.log(`Server is up on port ${port}`);
});
