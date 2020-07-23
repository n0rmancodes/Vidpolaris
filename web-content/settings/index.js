if (localStorage.getItem("invSrc")) {
	document.getElementById("invSrc").value = localStorage.getItem("invSrc");
}

if (localStorage.getItem("n_theme")) {
	document.getElementById("n_theme").value = localStorage.getItem("n_theme");
}

if (localStorage.getItem("sq")) {
	document.getElementById("sq").value = localStorage.getItem("sq");
}

function save(setting, val) {
	localStorage.setItem(setting, val);
}

function apply() {
	if (window.history.back()) {
		window.history.back();
		window.location.reload(); 
	} else {
		window.location.reload(); 
	}
}