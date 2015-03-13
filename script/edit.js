function editMessage(message) {

	var bottom = get('bottom');
	var background = create('div');
	background.className = 'modal-background';

	var rect = message.getBoundingClientRect();

	transformBottom(true, 
					rect.bottom + pageYOffset, 
					message.getElementsByClassName('message-text')[0].innerText);


	var editingWindow = create('div');

	message.style.zIndex = 1001;
	messages.onclick = null;
	document.body.appendChild(background);


	function transformBottom(startEditing, bottomPosition, text) {

		if(startEditing) {

			sendButton.innerText = 'save';
			bottomPosition += 135;
			bottom.style.position = 'absolute';
			bottom.style.bottom = 'calc(100% - ' + bottomPosition + 'px)';
			bottom.style.zIndex = 1001;

			textarea.value = addLineDividers(text, true);
			textarea.focus();

			sendButton.onclick = function() {

				var text = textarea.value;
				text = addLineDividers(text);
				if(!text) {
					return;
				}
				

				saveEditing(message, text);
			}
		}
		else {
			
			sendButton.innerText = 'Send';
			bottom.style.position = 'fixed';
			bottom.style.bottom = 0;
			bottom.style.zIndex = 100;

			message.style.zIndex = null;
			messages.onclick = messagesClick;
			sendButton.onclick = sendMessage;
			document.body.removeChild(background);
			textarea.value = '';
		}
	}

	function saveEditing(message, text) {

		//request...

		//localStorage
		var messages = getMessages();
		var i = 0;
		while(messages[i].id.toString() !== message.id.toString()) {
			++i;
		}
		messages[i].text = text;
		saveMessages(messages);
		//------------

		message.getElementsByClassName('message-text')[0].innerHTML = text;
		transformBottom(false);
	}
}