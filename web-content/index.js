if (!localStorage.getItem("invSrc")) {
	localStorage.setItem("invSrc", "official")
}
getTrending();

function getTrending(type, country) {
	document.getElementById("deet").innerHTML = "requesting server...";
	var xhr = new XMLHttpRequest();
	if (type == "") {
		var param = "";
	} else if (type == "gaming") {
		var param = "&type=gaming";
	} else if (type == "music") {
		var param = "&type=music"
	}
	if (country) {
		var param = param + "&locale=" + country
	}
	if (param == undefined) {
		var param = "";
	}
	if (localStorage.getItem("invSrc")) {
		var inst = localStorage.getItem("invSrc");
	} else {
		var inst = "snopyta";
	}
	xhr.open("GET", "api/trending?inst=" + inst + param);
	xhr.send();
	xhr.onload = function () {
		var json = JSON.parse(xhr.responseText);
		for (var c in json) {
			var link = document.createElement("A");
			link.href = "w?" + json[c].videoId;
			var base = document.createElement("DIV");
			base.classList.add("vidChip");
			var img = document.createElement("IMG");
			img.src = "/api/thumb/" + json[c].videoId;
			base.appendChild(img);
			if (json[c].title.length < 74) {
				var tit = document.createElement("H3");
				tit.innerHTML = json[c].title;
				base.appendChild(tit);
			} else {
				var tit = document.createElement("H3");
				tit.innerHTML = json[c].title.substring(0,75) + "...";
				base.appendChild(tit);
			}
			var aut = document.createElement("H4");
			var aut_ico = document.createElement("SPAN");
			aut_ico.classList.add("material-icons");
			aut_ico.innerHTML = "person";
			aut.appendChild(aut_ico);
			aut.innerHTML = aut.innerHTML + " " + json[c].author;
			base.appendChild(aut);
			var viw = document.createElement("H4");
			var viw_ico = document.createElement("SPAN");
			viw_ico.classList.add("material-icons");
			viw_ico.innerHTML = "visibility";
			viw.appendChild(viw_ico);
			viw.innerHTML = viw.innerHTML + " " + json[c].viewCount.toLocaleString() + " views";
			base.appendChild(viw);
			link.appendChild(base);
			document.getElementById("trending").appendChild(link);
		}
		document.getElementById("loader").style.display = "none";
		document.getElementById("home").style.display = "";
	}
}