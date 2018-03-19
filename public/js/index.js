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
	// $('#messages').append('<li>'+newMessage.text+'<li>');

	var li = $('<li></li>');
	li.text(`${newMessage.from}: ${newMessage.text}`);
	 $('#messages').append(li);
});

socket.on('disconnect', function(){
	console.log('Disconnected from server');
});



$('#message-form').on('submit', (e)=>{
	e.preventDefault();
	socket.emit('createMessage', {
		from: 'User',
		text: $('[name=message]').val()
	}, ()=>{

	});
});