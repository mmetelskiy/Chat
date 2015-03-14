document.body.onload = function() {

	showUsernameForm();
}

function showMessages() {

	getMessages();
	allMessages.forEach(function(message) {
		drawMessage(message);
	});
}

function getMessages() {
	
	//request...


	// var messages = [
	// 			{	"text": "Hello",
	// 				"id": "12345678",
	// 				"user": "Pasha",
	// 				"img": "icon/profile.png",
	// 				"time": "436278913" },

	// 			{	"text": "Hello",
	// 				"id": "784932789",
	// 				"user": "Dima",
	// 				"img": "icon/profile.png",
	// 				"time": "9874738923" },

	// 			{	"text": "How do you do?",
	// 				"id": "578902754",
	// 				"user": "Pasha",
	// 				"img": "icon/profile.png",
	// 				"time": "4673821923" }
	// 		];

//localStorage
	allMessages = JSON.parse(localStorage.getItem("messages"));
	if(!allMessages)
		allMessages = [];
//----------------
}
function saveMessages() {

	localStorage.setItem('messages', JSON.stringify(allMessages));
}

function getAvatar() {

	return 'icon/profile.png';
}

function clearMessageContainer() {

	while(messages.firstElementChild != emptyDiv) {

		messages.removeChild(messages.firstElementChild);
	}
}