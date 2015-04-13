function MessageNode(message) {
/*
<div class="message" id=123>
	<div class="message-img" usernameId="Id"></div>
	<div class="message-text"></div>
	<time></time>

	<div class="edit-button"></div>
</div>
*/
	var img = create('div', 'message-img');
	img.setAttribute('isernameId', message.userId);
	img.style.backgroundImage = 'url(' + users[message.userId].userImage + ')';

	var text = create('div', 'message-text');
	text.innerHTML = message.messageText;

	var time = create('time');
	var date = new Date(+message.messageTime);
	time.innerHTML = date.toLocaleTimeString() + "<br>" + date.toLocaleDateString();

	var msgNode = create('div', 'message');
	msgNode.id = message.messageId;

	msgNode.appendChild(img);
	msgNode.appendChild(text);
	msgNode.appendChild(time);

	if(usernameId == message.userId && !message.isDeleted) {

		msgNode.classList.add('my-message');

		var editButton = create('div', 'edit-button');
		msgNode.appendChild(editButton);
	}
	else if(message.isDeleted) {

		// msgNode.classList.add('deleted');
	}

	return msgNode;
}

function addLineDividers(text, fromHtml) {
	if(fromHtml) {
		return text.replace( /<br>+/g, '\n');
	}

	return text.replace( /^\s+|\s+$/g, '' ).replace(/\r?\n+/g, '<br>');
}

function sendMessage() {

	function MessageToPost(text) {
		
		return {
			"userId":usernameId,
			"messageText":text
		};
	}

	var text = textarea.value;
	text = addLineDividers(text);

	if(!text) {
		return;
	}

	var xhr = new XMLHttpRequest();
	xhr.open('POST', host + port + adr, true);

	var body = JSON.stringify(new MessageToPost(text));

	alert('POST:\n' + body);

	xhr.send(body);

	xhr.onreadystatechange = function() {

		if(xhr.status == 200) {

			showServerState(true);

			if(xhr.readyState == 4) {

				textarea.value = '';
			}
		}
		else {
			showServerState(false);
		}
	}
}