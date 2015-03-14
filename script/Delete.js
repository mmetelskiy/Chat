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
	for(var i = 0; i < allMessages.length; i++) {

		if(~selectedIds.indexOf(allMessages[i].id.toString())) {

			allMessages.splice(i--, 1);
		}
	}
	saveMessages();
	//-----------------
}