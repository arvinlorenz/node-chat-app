var socket = io();

socket.on('connect', function(){
	console.log('Connected to server');

	//create event that server will listen to
	// socket.emit('createEmail',{
	// 	to: 'lorenz@example.com',
	// 	text: 'Hi I am a client',
	// });

	

});

// socket.on('newEmail',function(email){
// 	console.log(email);
// });

socket.on('newMessage', function(newMessage){
	console.log('New Message:',newMessage);
});

socket.on('disconnect', function(){
	console.log('Disconnected from server');
});


