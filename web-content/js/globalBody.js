if (document.getElementById("q")) {
	document.getElementById("q").addEventListener('keydown', function (event) {
		if (event.defaultPrevented) {
			return;
		}

		var key = event.key || event.keyCode;
		
		if (key == "Enter" | key == 13) {
			search();
		}
	})
}

function search() {
	var q = document.getElementById("q").value;
	window.open("/s?"+q, "_self");
}