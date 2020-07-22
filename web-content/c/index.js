load();

function load() {
	document.getElementById("deet").innerHTML = "requesting server...";
	var id = window.location.search.substring(1,25);
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "/api/playlist?url=https://www.youtube.com/channel/" + id + "&limit=100");
	xhr.send();
	xhr.onload = function () {
		var json = JSON.parse(xhr.responseText);
		document.getElementById("auth").innerHTML = json.author.name;
		document.title = json.author.name + " | VidPolaris";
		document.getElementById("authIcon").src = "/api/proxy?url=" + btoa(json.author.avatar.split("=s1")[0]);
		document.getElementById("loader").style.display = "none";
		document.getElementById("main").style.display = "";
		for (var c in json.items) {
			var l = document.createElement("A");
			l.href = "w?" + json.items[c].url_simple.substring(32,43);
			var div = document.createElement("DIV");
			div.classList.add("vidChip");
			var img = document.createElement("IMG");
			img.src = "/api/proxy?url=" + btoa(json.items[c].thumbnail);
			div.appendChild(img);
			if (json.items[c].title.length < 74) {
				var tit = document.createElement("H3");
				tit.innerHTML = json.items[c].title;
				div.appendChild(tit);
			} else {
				var tit = document.createElement("H3");
				tit.innerHTML = json.items[c].title.substring(0,75) + "...";
				div.appendChild(tit);
			}
			var dur = document.createElement("H4");
			var dur_ico = document.createElement("SPAN");
			dur_ico.classList.add("material-icons");
			dur_ico.innerHTML = "timelapse";
			dur.appendChild(dur_ico);
			dur.innerHTML = dur.innerHTML + " " + json.items[c].duration;
			div.appendChild(dur);
			l.appendChild(div);
			document.getElementById("uploadFeed").appendChild(l);
		}
	}
}