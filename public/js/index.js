var socket = io();

socket.on('connect', function(){
	console.log('Connected to server');

	//create event that server will listen to
	// socket.emit('createEmail',{
	// 	to: 'lorenz@example.com',
	// 	text: 'Hi I am a client',
	// });

	socket.emit('createMessage',{
		from: 'Andrew',
		text: 'HELOO EVERYONE'
	})

});

// socket.on('newEmail',function(email){
// 	console.log(email);
// });

socket.on('newMessage', function(newMessage){
	console.log(newMessage);
});

socket.on('disconnect', function(){
	console.log('Disconnected from server');
});


