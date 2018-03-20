var socket = io();

socket.on('connect', function(){
	console.log('Connected to server');

	
});

socket.on('newMessage', function(newMessage){
	console.log('New Message:',newMessage);

	var li = $('<li></li>');
	li.text(`${newMessage.from}: ${newMessage.text}`);
	 $('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
	var li = $('<li></li>');
	var a = $('<a target="_blank">My current location</a>');

	li.text(`${message.from}: `);
	a.attr('href',message.url);

	li.append(a);
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


var locationButton = $('#send-location');
locationButton.on('click',()=>{
	if(!navigator.geolocation){
		return alert('Geolocation not supported by your browser');
	}

	navigator.geolocation.getCurrentPosition((position)=>{
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		})
	}, ()=> alert('Unable to fetch location'));
});