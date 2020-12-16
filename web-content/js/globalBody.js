if (localStorage.getItem("pf") == "o") {
	adapt();
}

if (document.getElementById("q")) {
	document.getElementById("q").addEventListener('keydown', function (event) {
		if (event.defaultPrevented) {return;}
		var key = event.key || event.keyCode;
		if (key == "Enter" | key == 13) {
			search();
		}
	})
}

if (localStorage.getItem("invSrc") == "official") {
	localStorage.setItem("invSrc", "snopyta");
}

function search() {
	var q = document.getElementById("q").value;
	window.open("/search?q="+q, "_self");
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

function checkText(elem) {
	var lnks = document.querySelectorAll(elem + " a");
	for (var c in lnks) {
		if (lnks[c].href) {
			var domain = lnks[c].href.replace('http://','').replace('https://','').split(/[/?#]/)[0];
			if (domain) {
				if (domain.split(".")[0] == "youtu" && domain.split(".")[1] == "be" && !domain.split(".")[3]) {
					var path = lnks[c].href.split("://")[1].split("/").slice(1);
					lnks[c].href = "/watch?v=" + path;
				} else if (domain.split(".")[0] == "youtube" | domain.split(".")[0] == "www" && domain.split(".")[1] == "youtube") {
					var path = lnks[c].href.toString().split("://")[1].split("/").slice(1);
					if (path[0].substring(0, 8) == "watch?v=" | path[0].substring(0, 14) == "playlist?list=") {
						lnks[c].href = path[0];
					} else if (path[0] == "channel" | path[0] == "user" | path[0] == "c") {
						lnks[c].href = "/channel/?" + path[1];
					}
				}
			}
		}
	}
}

function adapt() {
	if (window.location.pathname == "/settings") {window.open("/old/#settings", "_self");}
	if (window.location.pathname == "/") {window.open("/old/", "_self");}
	if (window.location.pathname == "/watch") {window.open("/old/#w#" + window.location.search.substring(3), "_self");}
	if (window.location.pathname == "/c") {window.open("/old/#c#" + window.location.search.substring(1), "_self");}
	if (window.location.pathname == "/p") {window.open("/old/#p#" + window.location.search.substring(1), "_self");}
	if (window.location.pathname == "/search") {window.open("/old/#s#" + window.location.search.substring(3), "_self")}
}