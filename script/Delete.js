function deleteSelected() {

	var selectedIds = [];
	selectedMessages.forEach(function(messageNode) {

		selectedIds.push(messageNode.id.toString());
	});

	deleteFromServer(selectedIds);

	//probably, temporary operation...
	while(selectedMessages.length) {
		var message = selectedMessages.pop();
		messages.removeChild(message);
	}
}

function deleteFromServer(selectedIds) {

	//request...


	//localStorage
	var messages = getMessages();

	for(var i = 0; i < messages.length; i++) {

		if(~selectedIds.indexOf(messages[i].id.toString())) {

			messages.splice(i--, 1);
		}
	}
	saveMessages(messages);
	//-----------------
}