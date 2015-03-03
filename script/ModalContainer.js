function showModal(formToShow) {
	modalIsShown = true;
	form.appendChild(formToShow);
	modalSkeletone.style.display = "block";
}

function hideModal () {
	modalIsShown = false;
	while(form.firstChild)
		form.removeChild(form.firstChild);
	modalSkeletone.style.display = "none";
}