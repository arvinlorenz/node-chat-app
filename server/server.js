const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;


var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));


io.on('connection', (socket)=>{
	console.log('New user connected');

	//creating event
	// socket.emit('newEmail', {
	// 	from: 'arvin@example.com',
	// 	text: 'Hello',
	// 	createdAt: 123
	// });

	// socket.on('createEmail', (newEmail)=>{
	// 	console.log('createEmail',newEmail);
	// });





	//io.emit - emits an event to every single connection
	socket.on('createMessage',(message)=>{		
		console.log(message);
		io.emit('newMessage', {
			from: message.from,
			text: message.text,
			createdAt: new Date().getTime()
		})
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
