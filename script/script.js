function get(id) {
	return document.getElementById(id);
}
function create(element) {
	return document.createElement(element);
}

var username = '';
var selectedMessages = [];

var textarea = get('textarea');
var sendButton = get('send-message-button');

var messages = get('messages');
var emptyDiv = messages.lastElementChild;
var deleteButton = get('delete-button');

var hint = get('username-hint');

var allMessages = [];