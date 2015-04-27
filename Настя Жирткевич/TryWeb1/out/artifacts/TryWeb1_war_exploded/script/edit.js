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
				
				alert("Before saving Edit");
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
		alert ("Edit");
		var xmlhttp = new XMLHttpRequest();
		//var params = "text=" + text + "&id=" + message.id + "&command=edit";
		var params = "{\"text\":\"" + text + "\",\"id\":\"" + message.id + "\","+ "\"command\":\"edit\"}";
		alert("putting: "+params);
		xmlhttp.open('PUT', "http://localhost:2221/MessageController", true);
		xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xmlhttp.send(params);

		xmlhttp.onreadystatechange = function () {

			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				//localStorage
				alert ("lucky edit");
				var i = 0;
				while (allMessages[i].id.toString() !== message.id.toString()) {
					++i;
				}
				allMessages[i].text = text;
				//saveMessages();
				//------------
			}
		};

		alert("shanging message text");
		message.getElementsByClassName('message-text')[0].innerHTML = text;
		transformBottom(false);
	}
}