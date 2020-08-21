load();

function load() {
	document.getElementById("deet").innerHTML = "requesting server...";
	var id = window.location.search.substring(1,25);
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "/api/channel?id=" + id);
	xhr.send();
	xhr.onload = function () {
		var json = JSON.parse(xhr.responseText);
		if (!json.err) {
			document.getElementById("auth").innerHTML = json.author;
			document.title = json.author + " | VidPolaris";
			if (json.authorThumbnails) {
				document.getElementById("authIcon").src = "/api/proxy?url=" + btoa(json.authorThumbnails[0].url.split("=s")[0]);
			} else {
				document.getElementById("authIcon").src = "/undefined.jpg";
			}
			if (json.authorBanners) {
				document.getElementById("back").style = "background:url('api/proxy?url=" + btoa(json.authorBanners[0].url.split("=w")[0] + "=w2560") + "');background-size:cover;"
			}
			if (json.description.includes("\n")) {
				document.getElementById("authDescShort").innerHTML = varLinks(json.description.split("\n")[0]);
				document.getElementById("authDesc").innerHTML = varLinks(json.description.replace("\n","<br>"));
				document.getElementById("authLonger").style.display = "";
			} else {
				document.getElementById("authDescShort").innerHTML = varLinks(json.description);
				document.getElementById("authLonger").style.display = "none";
			}
			if (json.subscriberCount) {
				document.getElementById("as").style.display = "";
				document.getElementById("authSub").innerHTML = json.subscriberCount.toLocaleString();
			} else {
				document.getElementById("as").style.display = "none";
			}
			document.getElementById("loader").style.display = "none";
			document.getElementById("main").style.display = "";
			xhr.open("GET", "/api/channel/videos?id=" + id);
			xhr.send();
			xhr.onload = function () {
				document.getElementById("loader2").style.display = "none";
				var json = JSON.parse(xhr.responseText);
				for (var c in json.items) {
					var link = document.createElement("A");
					link.href = "watch?v=" + json.items[c].videoId;
					var base = document.createElement("DIV");
					base.classList.add("vidChip");
					var img = document.createElement("IMG");
					img.src = "/api/thumb/" + json.items[c].videoId;
					base.appendChild(img);
					if (json.items[c].title.length < 74) {
						var tit = document.createElement("H3");
						tit.innerHTML = json.items[c].title;
						base.appendChild(tit);
					} else {
						var tit = document.createElement("H3");
						tit.innerHTML = json.items[c].title.substring(0,75) + "...";
						base.appendChild(tit);
					}
					var viw = document.createElement("H4");
					var viw_ico = document.createElement("SPAN");
					viw_ico.classList.add("material-icons");
					viw_ico.innerHTML = "visibility";
					viw.appendChild(viw_ico);
					viw.innerHTML = viw.innerHTML + " " + json.items[c].viewCount.toLocaleString() + " views";
					base.appendChild(viw);
					var pub = document.createElement("H4");
					var pub_ico = document.createElement("SPAN");
					pub_ico.classList.add("material-icons");
					pub_ico.innerHTML = "event";
					pub.appendChild(pub_ico);
					pub.innerHTML = pub.innerHTML + " " + json.items[c].publishedText;
					base.appendChild(pub);
					link.appendChild(base);
					document.getElementById("uploadFeed").appendChild(link);
				}
			}
		} else {
			document.getElementById("err").style.display = "";
			document.getElementById("loader").style.display = "none";
			document.getElementById("errTxt").innerHTML = json.err
		}
	}
}

function toggleDesc() {
	if (document.getElementById("authDesc").style.display == "none") {
		document.getElementById("authDesc").style.display = "";
		document.getElementById("authDescShort").style.display = "none";
		document.getElementById("btn").innerHTML = "Close";
	} else {
		document.getElementById("authDesc").style.display = "none";
		document.getElementById("authDescShort").style.display = "";
		document.getElementById("btn").innerHTML = "Expand";
	}
}