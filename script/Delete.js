function deleteSelected() {

	var selectedIds = [];
	selectedMessages.forEach(function(messageNode) {

		selectedIds.push(messageNode.id);
	});

	deleteFromServer(selectedIds);

	//probably, temporary operation...
	while(selectedMessages.length) {
		var message = selectedMessages.pop();
		messages.removeChild(message);
	}
}

function deleteFromServer(selectedIds) {

	//request

}