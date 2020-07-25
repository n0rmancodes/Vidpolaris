if (localStorage.getItem("n_theme")) {
	if (document.getElementById("h")) {
		var css = document.createElement("LINK");
		css.href = "/css/" + localStorage.getItem("n_theme") + "/style.css";
		css.rel = "stylesheet";
		document.getElementById("h").appendChild(css);
	} else {
		console.log("no 'h' element");
	}
} else {
	var css = document.createElement("LINK");
	css.href = "/css/light/style.css";
	css.rel = "stylesheet";
	document.getElementById("h").appendChild(css);
}