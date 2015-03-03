function makeTextFitElement(text, element) {
	// if(!element)
	// 	element = document.body;
	// if(widthOfTextInElement(text, element) < 551)
		return addLineDividers(text);
}

function addLineDividers(text) {
	return text.replace( /^\s+|\s+$/g, '' ).replace(/\r?\n+/g, '<br>');
}

function widthOfTextInElement(text, element) {
	if(!element)
		element = document.body;
	var span = document.createElement("span");
	span.style.display = "none";
	span.innerHTML = text;
	element.appendChild(span);
	var width = $(span).width();
	element.removeChild(span);
	return width;
}