function editMessage(message) {

	var bottom = get('bottom');
	var background = create('div');
	background.className = 'modal-background';

	transformBottom(true, 
					message.getBoundingClientRect().bottom + pageYOffset, 
					message.getElementsByClassName('message-text')[0].innerText);

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
				if(!text)
					return;

				saveEditing(message, text);
			}
		}
		else {

			sendButton.innerText = 'Send';
			bottom.style.position = 'fixed';
			bottom.style.bottom = 0;
			bottom.style.zIndex = 100;
			sendButton.onclick = sendMessage;
			document.body.removeChild(background);
			textarea.value = '';
		}
	}

	function saveEditing(message, text) {

		message.getElementsByClassName('message-text')[0].innerHTML = text;
		transformBottom(false);
	}
}