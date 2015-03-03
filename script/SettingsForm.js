function SettingsForm() {
/*
<div id="settings">
	<form>
		<span>Username</span>
		<input type="text">
	</form>
</div>
*/

	var span = document.createElement("span");
	span.innerText = "Username:";

	var input = document.createElement("input");
	input.type = "text";

	var form = document.createElement("form");
	form.appendChild(span);
	form.appendChild(input);

	var div = document.createElement("div");
	div.id = "settings";
	div.appendChild(form);

	return div;
}

function showSettings () {
	showModal(new SettingsForm());
}