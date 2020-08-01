if (document.getElementById("q")) {
	document.getElementById("q").addEventListener('keydown', function (event) {
		if (event.defaultPrevented) {return;}
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

function calcLString(string) {
	if (string.length == 1) {
		return "0:0" + le;
	} else if (string.length == 2 & l < 59) {
		return "0:" + le;
	} else {
		var h = Math.floor(string / 3600) | 0;
		var m = Math.floor(string / 60) -(h * 60) | 0;
		var s = string - (h * 3600)- (m * 60);
		if (m.toString().length == 1) {
			var m = "0" + m;
		}
		if (s.toString().length == 1) {
			var s = "0" + s;
		}
		if (h !== 0) {
			return h + ":" + m + ":" + s;
		} else {
			return m + ":" + s;
		}
	}
}

function varLinks(t) {
	var replacePattern = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
	return t.replace(replacePattern, '<a href="$1" class="channelLink">$1</a>');
}