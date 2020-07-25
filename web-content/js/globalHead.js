var o = document.createElement("LINK");
o.href = "http://vidpolaris.ml:9027/api/oembed?url=" + window.location.href;
o.type = "application/json+oembed";
document.getElementById("h").appendChild(o)


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