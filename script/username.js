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
			document.body.removeChild(background);
			textarea.focus();
		}
	}
	else {

		button.onclick = function() {

			var text = input.value;
			if(!text) {
				return;
			}

			enter(text);
			document.body.removeChild(background);
			textarea.focus();
		}
	}

	function enter(user) {
		
		setUsername(user);
		showMessages();

		get('bottom').firstElementChild.style.backgroundImage = 'url(' + getAvatar() + ')';
	}

	function changeUsername(user) {

		if(username === user) {
			setUsername(username);
			return;
		}

		for(var i = 0; i < allMessages.length; ++i) {

			if(allMessages[i].user === user) {
				setUsername(username);
				return;
			}
		}

		allMessages.forEach(function(message) {

			if(message.user === username) {
				message.user = user;
			}
		});

		//localStorage
		saveMessages();
		//------------------


		setUsername(user);
		//request...

		//temp???
		var myMessages = document.body.querySelectorAll('.my-message .message-img');
		myMessages.forEach = [].forEach;
		myMessages.forEach(function(message) {

			message.setAttribute('username', user);
		});
	}
}