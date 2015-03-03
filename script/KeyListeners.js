document.body.onkeypress = function(event) {
	if(modalIsShown) return;

	if(event.keyCode == 13) {
		if(sendOnEnter)
			sendMessage();
		else 
		{
			textarea.value = textarea.value.splice(0,textarea.selectionStart-1) + "\n" + textarea.value.splice(textarea.selectionStart);
		}
		return false;
	}
	else if(event.keyCode == 10) {
		if(sendOnEnter)
		{
			textarea.value = textarea.value.splice(0,textarea.selectionStart-1) + "\n" + textarea.value.splice(textarea.selectionStart);
		}
		else sendMessage();
		return false;
	}

	if(event.keyCode < 32) return;
	textarea.focus();
};