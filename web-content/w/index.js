load();
if (localStorage.getItem("sq") == "enabled") {
	document.getElementById("player").addEventListener("play", function() {
		if (!document.getElementById("aPlayer").src == "") {
			document.getElementById("aPlayer").play();
		}
	})
	
	document.getElementById("player").addEventListener("playing", function() {
		if (!document.getElementById("aPlayer").src == "") {
			document.getElementById("aPlayer").play();
		}
	})

	document.getElementById("player").addEventListener("pause", function() {
		if (!document.getElementById("aPlayer").src == "") {
			document.getElementById("aPlayer").pause();
			document.getElementById("aPlayer").currentTime = document.getElementById("player").currentTime;
		}
	})

	document.getElementById("player").addEventListener("seeked", function() {
		if (!document.getElementById("aPlayer").src == "") {
			document.getElementById("aPlayer").currentTime = document.getElementById("player").currentTime;
		}
	})

	document.getElementById("player").addEventListener("waiting",function() {
		if (!document.getElementById("aPlayer").src == "") {
			document.getElementById("aPlayer").pause();
		}
	})
}

function load() {
	var id = window.location.search.substring(1,12) 
	if (id) {
		document.getElementById("deet").innerHTML = "requesting server...";
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "/api/info?id="+id);
		xhr.send();
		xhr.onload = function () {
			var json = JSON.parse(xhr.responseText);
			if (!json.err) {
				sessionStorage.setItem("info", xhr.responseText.toString());
				document.getElementById("loader").style.display = "none";
				if (localStorage.getItem("sq") == "enabled") {
					document.getElementById("sqSB").style.display = "";
					document.getElementById("qSB").style.display = "none";
					for (var c in json.audio) {
						if (!json.audio[c].isDashMPD && !json.audio.isHLS) {
							var opt = document.createElement("OPTION");
							opt.innerHTML = json.audio[c].audioBitrate + "kbps [" + json.audio[c].codecs + "]";
							opt.value = json.audio[c].itag;
							document.getElementById("a").appendChild(opt);
						}
					}
					for (var c in json.video) {
						if (!json.video.isDashMPD && !json.video.isHLS) {
							var opt = document.createElement("OPTION");
							opt.innerHTML = json.video[c].qualityLabel + " [" + json.video[c].codecs + "]";
							opt.value = json.video[c].itag;
							document.getElementById("v").appendChild(opt);
						}
					}
					if (document.getElementById("v").options[0] && document.getElementById("a").options[0]) {
						document.getElementById("player").src = getItag(document.getElementById("v").options[0].value);
						document.getElementById("aPlayer").src = getItag(document.getElementById("a").options[0].value);
					} else {
						document.getElementById("sqSB").style.display = "none";
						document.getElementById("qSB").style.display = "";
						for (var c in json.joined) {
							var opt = document.createElement("OPTION");
							opt.innerHTML = json.joined[c].qualityLabel + " (" + json.joined[c].audioBitrate + " audio kbps) [" + json.joined[c].codecs + "]";
							opt.value = json.joined[c].itag;
							document.getElementById("va").appendChild(opt);
						}
						document.getElementById("player").src = getItag(document.getElementById("va").options[0].value);
						document.getElementById("player").load();
					}
					document.getElementById("player").load();
					document.getElementById("aPlayer").load();
					document.getElementById("volume").value = (document.getElementById("aPlayer").volume) * 100;
				} else {
					document.getElementById("sqSB").style.display = "none";
					document.getElementById("qSB").style.display = "";
					for (var c in json.joined) {
						var opt = document.createElement("OPTION");
						opt.innerHTML = json.joined[c].qualityLabel + " (" + json.joined[c].audioBitrate + " audio kbps) [" + json.joined[c].codecs + "]";
						opt.value = json.joined[c].itag;
						document.getElementById("va").appendChild(opt);
					}
					document.getElementById("player").src = getItag(document.getElementById("va").options[0].value);
					document.getElementById("player").load();
				}
				document.getElementById("player").poster = "/api/proxy/?url=" + btoa(json.info.videoDetails.thumbnail.thumbnails[json.info.videoDetails.thumbnail.thumbnails.length-1].url);
				document.getElementById("title").innerHTML = json.info.videoDetails.title;
				if (json.info.videoDetails.author.avatar) {
					document.getElementById("authIco").src = json.info.videoDetails.author.avatar;
				} else {
					document.getElementById("authIco").src = "/img/default.jpg";
				}
				document.getElementById("viewCount").innerHTML = parseInt(json.info.videoDetails.viewCount).toLocaleString() + " views";
				document.getElementById("pText").innerHTML = json.info.videoDetails.publishDate;
				if (json.info.videoDetails.description) {
					var desc = varLinks(json.info.videoDetails.description.simpleText.replace(/\n/g, "<br>"));
					document.getElementById("fullDesc").innerHTML = desc;
				} else if (json.info.videoDetails.shortDescription) {
					var desc = varLinks(json.info.videoDetails.shortDescription.replace(/\n/g, "<br>"));
					document.getElementById("fullDesc").innerHTML = desc;
				} else {
					var desc = "[No description]"
					document.getElementById("fullDesc").innerHTML = desc;
				}
				document.getElementById("auth").innerHTML = json.info.videoDetails.author.name;
				document.getElementById("authLink").href = "c?" + json.info.videoDetails.author.external_channel_url.substring(32,56)
				if (json.info.videoDetails.author.subscriber_count) {
					document.getElementById("authSub").innerHTML = json.info.videoDetails.author.subscriber_count.toLocaleString() + " subscribers";
				} else {
					document.getElementById("authSub").innerHTML = "No subscribers";
				}
				if (json.info.videoDetails.likes && json.info.videoDetails.dislikes) {
					document.getElementById("ri").style.display = "";
					document.getElementById("l").innerHTML = json.info.videoDetails.likes.toLocaleString();
					document.getElementById("dl").innerHTML = json.info.videoDetails.dislikes.toLocaleString();
					var tot = json.info.videoDetails.likes + json.info.videoDetails.dislikes;
					var rat = (json.info.videoDetails.likes / tot) * 100;
					document.getElementById("rBar").style = "width:" + rat + "%";
				} else {
					document.getElementById("ri").style.display = "none";
				}
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
					var len = document.createElement("SPAN");
					len.classList.add("time");
					len.innerHTML = calcLString(parseInt(json.info.related_videos[c].length_seconds));
					div.appendChild(len);
					vidChip.appendChild(div);
					l.appendChild(vidChip);
					document.getElementById("relatedFeed").appendChild(l);
				}
			} else {
				document.getElementById("loader").style.display = "none";
				document.getElementById("err").style.display = "";
				document.getElementById("errTxt").innerHTML = json.err;
			}
		} 
	}
}

function getItag(itag, type) {
	if (sessionStorage.getItem("info")) {
		var json = JSON.parse(sessionStorage.getItem("info"));
		var formats = json.info.formats;
		for (var c in formats) {
			if (formats[c].itag == parseInt(itag)) {
				if (type == "v") {
					document.getElementById("player").src = formats[c].url;
				} else if (type == "a") {
					document.getElementById("aPlayer").src = formats[c].url;
				} else {
					return formats[c].url;
				}
			}
		}
	}
}

function changeVolume(val) {
	val = (val / 100);
	document.getElementById("aPlayer").volume = val;
}