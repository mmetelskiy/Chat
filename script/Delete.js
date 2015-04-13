function deleteSelected() {

	var xhr = new XMLHttpRequest();
	xhr.open('DELETE', host + port + adr, true);

	xhr.send(JSON.stringify(selectedMessages));

	xhr.onreadystatechange = function() {

		if(xhr.status == 200) {

			showServerState(true);

			if(xhr.readyState == 4) {

				selectedMessages = [];
			}
		}
		else {
			showServerState(false);
		}
	}
}

function makeMessageDeleted(messageId) {
	

}