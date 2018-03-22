var socket = io();

socket.on('connect', function(){
	console.log('Connected to server');

	
});

socket.on('newMessage', function(newMessage){
	console.log('New Message:',newMessage);

	var formattedTIme = moment(newMessage.createdAt).format('h:mm a');
	var li = $('<li></li>');
	li.text(`${newMessage.from} ${formattedTIme}: ${newMessage.text}`);
	 $('#messages').append(li);
});

socket.on('newLocationMessage', function(message){

	var li = $('<li></li>');
	var a = $('<a target="_blank">My current location</a>');

	var formattedTIme = moment(message.createdAt).format('h:mm a');

	li.text(`${message.from} ${formattedTIme}: `);
	a.attr('href',message.url);

	li.append(a);
	$('#messages').append(li);
});

socket.on('disconnect', function(){
	console.log('Disconnected from server');
});



$('#message-form').on('submit', (e)=>{
	e.preventDefault();

	var messageTextbox = $('[name=message]');
	socket.emit('createMessage', {
		from: 'User',
		text: messageTextbox.val()
	}, ()=>{
		messageTextbox.val('');

	});

});


var locationButton = $('#send-location');
locationButton.on('click',function(){
	if(!navigator.geolocation){
		return alert('Geolocation not supported by your browser');
	}
	locationButton.attr('disabled', 'disabled').text('Sending location...');
	navigator.geolocation.getCurrentPosition(function(position){
		locationButton.removeAttr('disabled').text('Send location');
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
	}, function() {
		locationButton.removeAttr('disabled').text('Send location');
		alert('Unable to fetch location');
		
	});
});