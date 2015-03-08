document.body.onload = function() {

	showUsernameForm();
}

function showMessages() {

	var messages = getMessages();
	messages.forEach(function(message) {
		drawMessage(message);
	});
}

function getMessages() {
	
	//request...
	return [
				{	"text": "Hello",
					"id": "12345678",
					"user": "Pasha",
					"img": "icon/profile.png",
					"time": "436278913" },

				{	"text": "Hello",
					"id": "784932789",
					"user": "Dima",
					"img": "icon/profile.png",
					"time": "9874738923" },

				{	"text": "How do you do?",
					"id": "578902754",
					"user": "Pasha",
					"img": "icon/profile.png",
					"time": "4673821923" }
			];
}

function getAvatar() {

	return 'icon/profile.png';
}