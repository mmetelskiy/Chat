messages.onclick = messagesClick;

function messagesClick(event) {
	
	var target = event.target;
	if(target.classList.contains('my-message')) {

		var message = target;
		toggleSelection(message);
	}
	else if(target.classList.contains('edit-button')) {

		editMessage(target.parentNode);
	}
	return false;
}

document.body.onmousemove = function(event) {

	var target = event.target;
	if(!target.classList.contains('message-img')) {
		hint.style.display = 'none';
		return;
	}

	var text = target.getAttribute('username');
	hint.innerText = text;
	hint.style.right = 'calc(100% - ' + event.pageX + 'px + 2px)';
	hint.style.top = 'calc(' + event.pageY + 'px - 1em - 10px)';
	hint.style.display = '';
}

deleteButton.onmouseover = function() {
	this.style.opacity = '1';
}
deleteButton.onmouseout = function() {
	this.style.opacity = '.3';
}
deleteButton.onclick = function() {
	//alert("DeleteButton");
	deleteSelected();
	checkDeleteButtonState();
}

sendButton.onclick = sendMessage;

get('userdiv').onclick = function() {
	
	showUsernameForm(true);
}

get('exit').onclick = function() {

	clearMessageContainer();
	showUsernameForm();
}