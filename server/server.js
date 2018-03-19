const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const {generateMessage} = require('./utils/message');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));


io.on('connection', (socket)=>{
	console.log('New user connected');

	socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));

	socket.broadcast.emit('newMessage', generateMessage('Admmin','New user joined'))





	//io.emit - emits an event to every single connection
	socket.on('createMessage',(message,callback)=>{		
		console.log(message);
		io.emit('newMessage', generateMessage(message.from,message.text));
		callback('This is from the server');
		// socket.broadcast.emit('newMessage', { //exept the sender
		// 	from: message.from,
		// 	text: message.text,
		// 	createdAt: new Date().getTime()
		// })
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
