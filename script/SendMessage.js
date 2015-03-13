function MessageNode(text, id, user, milliseconds, urlToImg) {
/*
<div class="message">
	<div class="message-img" username="User"></div>
	<div class="message-text"></div>
	<time></time>

	<div class="edit-button"></div>
</div>
*/
	
	var mesImg = create('div');
	mesImg.className = 'message-img';
	mesImg.setAttribute('username', user);
	mesImg.style.backgroundImage = 'url(' + urlToImg + ')'

	var mesText = create('div');
	mesText.className = 'message-text';
	mesText.innerHTML = text;

	var mesTime = create('time');
	var date = new Date(+milliseconds);
	mesTime.innerHTML = date.toLocaleTimeString() + "<br>" + date.toLocaleDateString();

	var message = create('div');
	message.className = 'message';
	message.id = id;

	message.appendChild(mesImg);
	message.appendChild(mesText);
	message.appendChild(mesTime);

	if(user == username) {

		message.classList.add('my-message');

		var editButton = create('div');
		editButton.className = 'edit-button';
		message.appendChild(editButton);
	}
	return message;
}

function Message(user, text) {

	function sendMessageOnServer(user, text) {
		
		//request...
		var message = {};
		message.text = text;
		message.time = +(new Date);
		message.user = user;
		message.id = message.time;
		message.img = 'icon/profile.png';

		//localStorage
		var messages = getMessages();
		messages.push(message);
		saveMessages(messages);
		//-----------------

		return message;
	}

	var message = sendMessageOnServer(user, text);
	return message;
}

function addLineDividers(text, fromHtml) {
	if(fromHtml) {
		return text.replace( /<br>+/g, '\n');
	}

	return text.replace( /^\s+|\s+$/g, '' ).replace(/\r?\n+/g, '<br>');
}

function sendMessage() {

	var text = textarea.value;
	text = addLineDividers(text);
	if(!text) {
		return;
	}

	var message = new Message(username, text);

	drawMessage(message);
}

function drawMessage(message) {
	
	var messageNode = new MessageNode(	message['text'],
										message['id'],
										message['user'],
										message['time'],
										message['img']);

	messages.insertBefore(messageNode, emptyDiv);
	messageNode.scrollIntoView();
	textarea.value = '';
}