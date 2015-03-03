function enter () {
	//request?

	hideModal();
	return false;
}

function register() {
	//request?
}

function sendMessage() {
	var message = textarea.value;
	if(!message)
		return;
	//messageID?
	//server?
	drawMessage(message, true);
	textarea.value = '';
}

function changeUsername() {

	hideModal();
}