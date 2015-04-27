function deleteSelected() {
	//alert("DeleteSelected");
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
	//alert("DeleteServer");
	//request...
	var xmlhttp = new XMLHttpRequest();
	//var params = "?ids=" + selectedIds + "&command=delete";
	var params = "ids=" + selectedIds + "&command=delete";
	//xmlhttp.open('GET', "http://localhost:2222/MessageController" + params, true);
	//xmlhttp.send(null);

	xmlhttp.open('DELETE', "http://localhost:2221/MessageController", true);
	xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');


	xmlhttp.onreadystatechange = function () {

		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			for(var i = 0; i < allMessages.length; i++) {
				if(~selectedIds.indexOf(allMessages[i].id.toString())) {
					allMessages.splice(i--, 1);
				}
			}
			//saveMessages();
		}
	};
	xmlhttp.send(params);
	//-----------------
}