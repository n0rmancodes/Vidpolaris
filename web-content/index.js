if (localStorage.getItem("hp") == "youtube") {
	getTrending();
} else {
	redditTrending();
}

function getTrending() {
	document.getElementById("yt").style.display = "";
	document.getElementById("reddit").style.display = "none";
	document.getElementById("deet").innerHTML = "requesting server...";
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "/api/trending/");
	xhr.send();
	xhr.onload = function () {
		var json = JSON.parse(xhr.responseText);
		for (var c in json) {
			var link = document.createElement("A");
			link.href = "watch?v=" + json[c].videoId;
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

function redditTrending() {
	document.getElementById("yt").style.display = "none";
	document.getElementById("reddit").style.display = "";
	document.getElementById("deet").innerHTML = "requesting server...";
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "/api/reddit/");
	xhr.send();
	xhr.onload = function () {
		var json = JSON.parse(xhr.responseText);
		for (var c in json) {
			var link = document.createElement("A");
			link.href = "watch?v=" + json[c].id;
			var base = document.createElement("DIV");
			base.classList.add("vidChip");
			var img = document.createElement("IMG");
			img.src = "/api/thumb/" + json[c].id;
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
			var up = document.createElement("H4");
			var up_ico = document.createElement("SPAN");
			up_ico.classList.add("material-icons");
			up_ico.innerHTML = "arrow_upward";
			up.appendChild(up_ico);
			up.innerHTML = up.innerHTML + " " + json[c].score.toLocaleString() + " upvotes";
			base.appendChild(up);
			link.appendChild(base);
			document.getElementById("rTrend").appendChild(link);
		}
		document.getElementById("loader").style.display = "none";
		document.getElementById("home").style.display = "";
	}
}