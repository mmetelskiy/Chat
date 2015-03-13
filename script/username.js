function setUsername(user) {
	
	username = user;
	get('userdiv').innerText = username;
	get('userdiv').style.display = '';
}

function showUsernameForm(isChanging) {

	get('userdiv').style.display = 'none';

	var background = create('div');
	background.className = 'modal-background';

	var enterContainer = create('div');
	enterContainer.className = 'entering';

	var p = create('p');
	p.innerText = 'Username:';
	var input = create('input');
	input.type = 'text';
	input.placeholder = 'Enter username';
	var button = create('button');
	button.innerText = 'Enter';

	enterContainer.appendChild(p);
	enterContainer.appendChild(input);
	enterContainer.appendChild(button);

	background.appendChild(enterContainer);
	document.body.appendChild(background);

	input.focus();

	if(isChanging) {

		input.value = username;
		button.onclick = function() {
			var text = input.value;
			if(!text)
				return;

			changeUsername(text);
		}
	}
	else {

		button.onclick = function() {

			var text = input.value;
			if(!text) {
				return;
			}

			enter(text);
		}
	}

	function enter(user) {
		
		setUsername(user);
		showMessages();
		document.body.removeChild(background);
		textarea.focus();

		get('bottom').firstElementChild.style.backgroundImage = 'url(' + getAvatar() + ')';
	}

	function changeUsername(user) {
		
		//localStorage
		var messages = getMessages();
		messages.forEach(function(message) {

			if(message.user === username) {
				message.user = user;
			}
		});
		saveMessages(messages);
		//------------------


		setUsername(user);
		//request...

		//temp???
		var myMessages = document.body.querySelectorAll('.my-message .message-img');
		myMessages.forEach = [].forEach;
		myMessages.forEach(function(message) {

			message.setAttribute('username', user);
		});

		document.body.removeChild(background);

		textarea.focus();
	}
}