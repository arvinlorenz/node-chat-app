const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const {generateMessage, generateLocationMessage} = require('./utils/message');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));


io.on('connection', (socket)=>{
	console.log('New user connected');

	socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));

	socket.broadcast.emit('newMessage', generateMessage('Admin','New user joined')) //all user, not sender





	//io.emit - emits an event to every single connection including the sender
	socket.on('createMessage',(message,callback)=>{		
		console.log(message);
		io.emit('newMessage', generateMessage(message.from,message.text));
		callback();
	});

	socket.on('createLocationMessage', (coords)=>{
		io.emit('newLocationMessage', generateLocationMessage('Admin',coords.latitude,coords.longitude));
	});

	socket.on('disconnect', ()=>{
		console.log('User disconnected');
	});
});
// socket.emit create event that client will listen to. THat will be inside connect callback function
// socket.on event listener from client

server.listen(port, ()=>{
	console.log(`Server is up on port ${port}`);
});
