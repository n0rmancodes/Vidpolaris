load();

function load() {
	var id = window.location.search.substring(1,12) 
	if (id) {
		document.getElementById("deet").innerHTML = "requesting server...";
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "/api/info?id="+id);
		xhr.send();
		xhr.onload = function () {
			var json = JSON.parse(xhr.responseText);
			document.getElementById("loader").style.display = "none";
			document.getElementById("player").src = json.joined[0].url;
			document.getElementById("player").poster = "/api/proxy/?url=" + btoa(json.info.videoDetails.thumbnail.thumbnails[json.info.videoDetails.thumbnail.thumbnails.length-1].url);
			document.getElementById("title").innerHTML = json.info.videoDetails.title;
			document.getElementById("authIco").src = json.info.videoDetails.author.avatar.split("=s")[0];
			document.getElementById("viewCount").innerHTML = parseInt(json.info.videoDetails.viewCount).toLocaleString() + " views";
			document.getElementById("pText").innerHTML = json.info.videoDetails.publishDate;
			var shortDesc = varLinks(json.info.videoDetails.shortDescription.replace(/\n/g, "<br>"));
			var desc = varLinks(json.info.videoDetails.description.simpleText.replace(/\n/g, "<br>"));
			if (desc.length == shortDesc.length) {
				document.getElementById("shortDesc").innerHTML = shortDesc;
				document.getElementById("isLonger").style.display = "none";
				document.getElementById("fullDesc").innerHTML = desc;
			} else {
				document.getElementById("isLonger").style.display = "";
				document.getElementById("shortDesc").innerHTML = shortDesc;
				document.getElementById("fullDesc").innerHTML = desc;
			}
			document.getElementById("auth").innerHTML = json.info.videoDetails.author.name;
			document.getElementById("authSub").innerHTML = json.info.videoDetails.author.subscriber_count.toLocaleString() + " subscribers";
			document.getElementById("l").innerHTML = json.info.videoDetails.likes.toLocaleString();
			document.getElementById("dl").innerHTML = json.info.videoDetails.dislikes.toLocaleString();
			var tot = json.info.videoDetails.likes + json.info.videoDetails.dislikes;
			var rat = (json.info.videoDetails.likes / tot) * 100;
			document.getElementById("rBar").style = "width:" + rat + "%";
			document.title = json.info.videoDetails.title + " | VidPolaris";
			document.getElementById("main").style.display = "";
			for (var c in json.info.related_videos) {
				var l = document.createElement("A");
				l.href = "w?" + json.info.related_videos[c].id;
				var vidChip = document.createElement("DIV");
				vidChip.classList.add("horiVidChip");
				var img = document.createElement("IMG");
				img.src = "/api/proxy?url=" + btoa(json.info.related_videos[c].video_thumbnail.split("?")[0]);
				vidChip.appendChild(img);
				var div = document.createElement("DIV");
				var tit = document.createElement("H3");
				tit.innerHTML = json.info.related_videos[c].title;
				div.appendChild(tit);
				var aut = document.createElement("H4");
				var aut_ico = document.createElement("SPAN");
				aut_ico.innerHTML = "person";
				aut_ico.classList.add("material-icons");
				aut.appendChild(aut_ico);
				aut.innerHTML = aut.innerHTML + " " + json.info.related_videos[c].author;
				div.appendChild(aut);
				var viw = document.createElement("H4");
				var viw_ico = document.createElement("SPAN");
				viw_ico.innerHTML = "visibility";
				viw_ico.classList.add("material-icons");
				viw.appendChild(viw_ico);
				viw.innerHTML = viw.innerHTML + " " + json.info.related_videos[c].short_view_count_text + " views";
				div.appendChild(viw);
				vidChip.appendChild(div);
				l.appendChild(vidChip);
				document.getElementById("relatedFeed").appendChild(l);
			}
		}
	}
}

function varLinks(t) {
	var replacePattern = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
	return t.replace(replacePattern, '<a href="$1" class="channelLink">$1</a>');
}

function toggleDesc() {
	if (document.getElementById("shortDesc").style.display == "") {
		document.getElementById("shortDesc").style.display = "none";
		document.getElementById("fullDesc").style.display = "";
	} else {
		document.getElementById("shortDesc").style.display = "";
		document.getElementById("fullDesc").style.display = "none";
	}
}