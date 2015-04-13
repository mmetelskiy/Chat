document.body.onload = function() {

	showUsernameForm();
}

function startGettingMessages() {

	timer = setTimeout(function func() {

		doGet();
		timer = setTimeout(func, 1000);
	}, 1000);
}

function doGet() {

	var params = '?messageToken=' + messageToken;	//...

	alert('GET:\n' + params);

	var xhr = new XMLHttpRequest();

	xhr.open('GET', host + port + adr + params, true);

	xhr.send();

	xhr.onreadystatechange = function() {

		if(xhr.status == 200) {

			showServerState(true);

			if(xhr.readyState == 4) {

				var resp = xhr.responseBody;

				if(resp.messageToken) {

					resp.messages.forEach(function(message) {

						drawMessage(message);
					});
				}

				if(resp.messageEditToken) {

					resp.editedMessages.forEach(function(editing) {

						setMessageText(editing.messageId, editing.messageText);
					});
				}

				if(resp.messageDeleteToken) {

					resp.deletedMessagesIds.forEach(function(id) {

						makeMessageDeleted(id);
					});
				}

				if(resp.userToken) {

					resp.users.forEach(function(user) {

						users[user.userId] = {
							"username":user.username,
							"userImage":user.userImage
						};
					});
				}

				if(resp.userChangeToken) {

					resp.changedUsers.forEach(function(user) {

						users[user.userId] = {

							"username":user.username,
							"userImage":user.userImage
						};

						if(usernameId == user.userId) {

							if(user.username) {

								setUsername(user.username);
							}
							if(user.userImage) {

								
							}
						}
					})
				}
			}
		}
		else {
			showServerState(false);
		}
	}
}

function setMessageText(messageId, text) {

	get(messageId).getElementsByClassName('message-text')[0].innerHTML = text;
}

function drawMessage(message) {
	
	var messageNode = new MessageNode(message);

	messages.insertBefore(messageNode, emptyDiv);
	messageNode.scrollIntoView();
}

function clearMessageContainer() {

	while(messages.firstElementChild != emptyDiv) {

		messages.removeChild(messages.firstElementChild);
	}
}