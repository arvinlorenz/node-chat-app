var socket = io();

function scrollToBottom() {
	var messages = $('#messages');
	var newMessage = messages.children('li:last-child');
	var clientHeight = messages.prop('clientHeight');
	var scrollTop = messages.prop('scrollTop');
	var scrollHeight = messages.prop('scrollHeight');
	var newMessageHeight = newMessage.innerHeight();
	var lastMessageHeight = newMessage.prev().innerHeight();

	if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
		messages.scrollTop(scrollHeight);
	}
}
socket.on('connect', function(){
	// console.log('Connected to server');
	var params = $.deparam(window.location.search);

	socket.emit('join', params, function(err) {
		if(err){
			alert(err);
			window.location.href = '/';
		}else{
			console.log('No error');
		}
	});

});

socket.on('disconnect', function(){
	console.log('Disconnected from server');
});

socket.on('updateUserList', function(users){
	var ol= $('<ol></ol>');

	users.forEach(function(user){
		ol.append($('<li></li>').text(user));
	});

	$('#users').html(ol);
});


socket.on('newMessage', function(newMessage){
	//Using mustache.js grab it from github
	var formattedTIme = moment(newMessage.createdAt).format('h:mm a');
	var template = $('#message-template').html();
	var html = Mustache.render(template, {
		text: newMessage.text,
		from: newMessage.from,
		createdAt: formattedTIme
	});

	$('#messages').append(html);
	scrollToBottom();
	// console.log('New Message:',newMessage);

	// var formattedTIme = moment(newMessage.createdAt).format('h:mm a');
	// var li = $('<li></li>');
	// li.text(`${newMessage.from} ${formattedTIme}: ${newMessage.text}`);
	//  $('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
	var formattedTIme = moment(message.createdAt).format('h:mm a');
	var template = $('#location-message-template').html();
	var html = Mustache.render(template, {
		url: message.url,
		from: message.from,
		createdAt: formattedTIme
	});

	$('#messages').append(html);
	scrollToBottom();

	

	// var li = $('<li></li>');
	// var a = $('<a target="_blank">My current location</a>');
	// li.text(`${message.from} ${formattedTIme}: `);
	// a.attr('href',message.url);

	// li.append(a);
	// $('#messages').append(li);
});





$('#message-form').on('submit', (e)=>{
	e.preventDefault();
	var params = $.deparam(window.location.search);
	var messageTextbox = $('[name=message]');
	socket.emit('createMessage', {
		from: params.name,
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