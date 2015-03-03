document.getElementById("settings-button").onclick = showSettings;

document.getElementById("send-message-button").onclick = sendMessage;

messageContainer.onmousedown = function (event) {

	var target = event.target;

	if(target.classList.contains("my-message")) {
		target.classList.toggle('selected-message');
		if(target.classList.contains('selected-message'))
			drawEditButton(target);
		else
			removeEditButton(target);
	}
	else if(target.classList.contains("edit-button")) {
		//run editing
	}
	return false;
};