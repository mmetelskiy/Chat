function drawMessage(textMessage, my) {
	var message = document.createElement("div");
	message.className = my ? "my-message" : "friend-message";

	var textDiv = document.createElement("div");

	var currentTime = new Date;
	var sendingTime = currentTime.toLocaleTimeString() + "<br>" + currentTime.toLocaleDateString();
	var time = document.createElement("time");
	time.innerHTML = sendingTime;

	message.appendChild(textDiv);
	message.appendChild(time);

	messageContainer.appendChild(message);
	textDiv.innerHTML = makeTextFitElement(textMessage, textDiv);		
	message.scrollIntoView();
}

function drawEditButton(message) {
	var editButton = document.createElement('div');
	editButton.className = 'edit-button';

	message.appendChild(editButton);
}

function removeEditButton(message) {
	message.removeChild(message.lastChild);
}