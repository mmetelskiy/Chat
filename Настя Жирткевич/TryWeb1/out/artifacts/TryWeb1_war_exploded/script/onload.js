var lastIdHist;

document.body.onload = function() {

	showUsernameForm();

}

function showMessages() {
	lastIdHist = '000000';
	lastEditIdHist = '000000';
	lastDeleteIdHist = '0000000';
	lastChangeIdHist = '0000000';
	var isFirst = true;
	timer = setTimeout(function func() {
		getMessages(isFirst);
		isFirst = false;
		timer = setTimeout(func, 10000);
	}, 10000);
}

function getMessages(isFirst) {
	
	//request...
	getRequest(isFirst);
	editRequest(isFirst);
	deleteRequest(isFirst);
	userRequest(isFirst);


			// var messages = [
	// 			{	"text": "Hello",
	// 				"id": "12345678",
	// 				"user": "Pasha",
	// 				"img": "icon/profile.png",
	// 				"time": "436278913" },

	// 			{	"text": "Hello",
	// 				"id": "784932789",
	// 				"user": "Dima",
	// 				"img": "icon/profile.png",
	// 				"time": "9874738923" },

	// 			{	"text": "How do you do?",
	// 				"id": "578902754",
	// 				"user": "Pasha",
	// 				"img": "icon/profile.png",
	// 				"time": "4673821923" }
	// 		];

//localStorage
	return true;
//----------------
}

function getRequest(isFirst)
{
	var xmlhttp;
	xmlhttp = new XMLHttpRequest();
	var params = "?username=" + username + "&token="+ lastIdHist + "&command=getAllMessage";
	xmlhttp.open('GET', "http://localhost:2221/MessageController" + params, true);
	xmlhttp.send(null);

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			showServerState(true);
			var messages = xmlhttp.responseText;
			//var obj = JSON.stringify(eval("(" + xmlhttp.responseText + ")"));
			//alert(messages);
			lastIdHist = messages.split(']')[1];
			//alert(lastIdHist);
			messages = messages.split(']')[0] + "]";
			newMessages = JSON.parse(JSON.stringify(eval("(" + messages	+ ")")));
			if (!newMessages)
				newMessages = [];
			//clearMessageContainer();
			newMessages.forEach(function(message){
				if (message.user !== username || isFirst)
					drawMessage(message);
			});
			allMessages.concat(newMessages);
			newMessages = [];
			//saveMessages();
		}
		else
		{
			showServerState(false);
		}
	};
}

function editRequest(isFirst)
{
	var xmlhttp;
	xmlhttp = new XMLHttpRequest();
	var params = "?username=" + username + "&token="+ lastEditIdHist + "&command=getAllEditedMessage";
	xmlhttp.open('GET', "http://localhost:2221/MessageController" + params, true);
	xmlhttp.send(null);

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			showServerState(true);
			var messages = xmlhttp.responseText;
			//var obj = JSON.stringify(eval("(" + xmlhttp.responseText + ")"));
			//alert(messages);
			lastEditIdHist = messages.split(']')[1];
			messages = messages.split(']')[0] + "]";
			//localStorage.setItem('messages', JSON.stringify(eval("(" + messages	+ ")")));
			//alert(id);
			//newMessages = JSON.parse(localStorage.getItem("messages"));
			newEditedMessages = JSON.parse(JSON.stringify(eval("(" + messages	+ ")")));
			if (!newEditedMessages)
				newEditedMessages = [];
			//clearMessageContainer();
			newEditedMessages.forEach(function(message) {
				var i = 0;
				while (allMessages[i].id.toString() !== message.id.toString()) {
					++i;
				}
				allMessages[i].text = message.text;
				message.getElementsByClassName('message-text')[0].innerHTML = message.text;		//Ask Misha!!!!!!!!!!
			});
			newEditedMessages = [];
			//saveMessages();
		}
		else
		{
			showServerState(false);
		}
	};
}

function deleteRequest(isFirst)
{
	var xmlhttp;
	xmlhttp = new XMLHttpRequest();
	var params = "?username=" + username + "&token="+ lastDeleteIdHist + "&command=getAllDeletedMessage";
	xmlhttp.open('GET', "http://localhost:2221/MessageController" + params, true);
	xmlhttp.send(null);

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			showServerState(true);
			var idsToDelete = xmlhttp.responseText;
			//var obj = JSON.stringify(eval("(" + xmlhttp.responseText + ")"));
			//alert(messages);
			lastDeleteIdHist = idsToDelete.split(']')[1];
			idsToDelete = idsToDelete.split(']')[0] + "]";
			ids = JSON.parse(JSON.stringify(eval("(" + idsToDelete + ")")));
			if (!ids)
				ids = [];
			//clearMessageContainer();
			for(var i = 0; i < allMessages.length; i++) {
				if(~ids.indexOf(allMessages[i].id.toString())) {
					allMessages.splice(i--, 1);
				}
			}
			//saveMessages();
		}
		else
		{
			showServerState(false);
		}
	};
}


function userRequest(isFirst)
{
	var xmlhttp;
	xmlhttp = new XMLHttpRequest();
	var params = "?username=" + username + "&token="+ lastChangeIdHist + "&command=getAllChangedUser";
	xmlhttp.open('GET', "http://localhost:2221/MessageController" + params, true);
	xmlhttp.send(null);

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var resp = xmlhttp.responseText;
			lastChangeIdHist = resp.split(']')[1];
			resp = resp.split(']')[0] + "]";
			var names = JSON.parse(JSON.stringify(eval("(" + resp + ")")));
			if (!names)
				names = [];

																						// ASK MISHA!!!!!

			//saveMessages();
		}
	};
}


function saveMessages() {

	localStorage.setItem('messages', JSON.stringify(allMessages));
}

function getAvatar() {

	return 'icon/profile.png';
}

function clearMessageContainer() {

	while(messages.firstElementChild != emptyDiv) {

		messages.removeChild(messages.firstElementChild);
	}
}