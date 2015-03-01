/*
<div id="login-form">
	<form>
		<span>Username:</span>
		<input type="text" id="username">
		<span>Password:</span>
		<input type="password" id="password">
		<button id="enter">Enter</button>
		<button id="register">Register</button>
	</form>
</div>
*/
function LoginForm() {
	var textUsername = document.createElement("span");
	textUsername.innerText = "Username:";

	var inputUsername = document.createElement("input");
	inputUsername.type = "text";
	inputUsername.id = "username";

	var textPassword = document.createElement("span");
	textPassword.innerText = "Password";

	var inputPassword = document.createElement("input");
	inputPassword.type = "password";
	inputPassword.id = "password";

	var buttonEnter = document.createElement("button");
	buttonEnter.id = "enter";
	buttonEnter.innerText = "Enter";
	buttonEnter.onclick = enter;

	var buttonRegister = document.createElement("button");
	buttonRegister.id = "register";
	buttonRegister.innerText = "Register";
	buttonRegister.onclick = register;


	var form = document.createElement("form");
	form.appendChild(textUsername);
	form.appendChild(inputUsername);
	form.appendChild(textPassword);
	form.appendChild(inputPassword);
	form.appendChild(buttonEnter);
	form.appendChild(buttonRegister);

	var loginForm = document.createElement("div");
	loginForm.id = "login-form";
	loginForm.appendChild(form);

	return loginForm;
}