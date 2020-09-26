load();
if (localStorage.getItem("theaterNew") == "y") {theater("update")}
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

	document.getElementById("player").addEventListener("waiting", function() {
		if (!document.getElementById("aPlayer").src == "") {
			document.getElementById("aPlayer").pause();
		}
	})

	document.getElementById("player").addEventListener("ended", function() {
		if (localStorage.getItem("ap") && localStorage.getItem("ap") == "true") {
			if (document.querySelectorAll("#relatedFeed a").length == 0) {
				console.log("we want to autoplay but can't due to there being no reccomendations");
			} else {
				setTimeout(function () {
					document.querySelectorAll("#relatedFeed a")[0].click();
				}, 1000)
			}
		}
	})
}

if (localStorage.getItem("ap") && localStorage.getItem("ap") == "true") {
	document.getElementById("autoplay").checked = true;
} else {
	document.getElementById("autoplay").checked = false;
}

document.addEventListener('keydown', function (event) {
	if (event.defaultPrevented) {return;}
	var k = event.key || event.keyCode;
	var intK = event.keyCode;
	if (isNumberKey(intK)) {
		if (document.getElementById("main").style.display == "") {
			var n = returnNumber(intK);
			var integer = document.getElementById("player").duration / 10
			var goTo = integer * n;
			document.getElementById("player").currentTime = goTo;
		}
	} else {
		if (document.activeElement.tagName == "INPUT" | document.activeElement.tagName == "SELECT") {
			console.log("ignored due to being inside an input or select element");
		} else {
			if (k == "k" | k == "K" | k == 75) {
				if (document.getElementById("player").paused == true) {
					document.getElementById("player").play();
				} else {
					document.getElementById("player").pause();
				}
			} else if (k == "t" | k == "T" | k == 84) {
				theater();
			} else if (k == "j" | k == "J" | k == 74) {
				if (document.getElementById("player").currentTime > 10) {
					var t = document.getElementById("player").currentTime - 10
					document.getElementById("player").currentTime = t
				} else {
					document.getElementById("player").currentTime = 0;
				}
			} else if (k == "l" | k == "L" | k == 76) {
				var d = document.getElementById("player").duration;
				var c = document.getElementById("player").currentTime;
				var diff = d - c;
				if (diff > 10) {
					document.getElementById("player").currentTime = document.getElementById("player").currentTime + 10
				} else {
					document.getElementById("player").currentTime = d;
				}
			}
		}
	}
})

function isNumberKey(j) {
	if (j <= 57 && j >= 48) {
		return true;
	} else {
		return false;
	}
}

function returnNumber(j) {
	if (j == 48) {
		return 0;
	} else if (j == 49) {
		return 1;
	} else if (j == 50) {
		return 2;
	} else if (j == 51) {
		return 3;
	} else if (j == 52) {
		return 4;
	} else if (j == 53) {
		return 5;
	} else if (j == 54) {
		return 6;
	} else if (j == 55) {
		return 7;
	} else if (j == 56) {
		return 8;
	} else if (j == 57) {
		return 9;
	} else {
		return null;
	}
}

function autoCorrect() {
	if (document.getElementById("aPlayer").src && !document.getElementById("aPlayer").paused) {
		var diff = (document.getElementById("player").currentTime - document.getElementById("aPlayer").currentTime);
		console.log(diff)
		if (diff > 0.15) {
			document.getElementById("aPlayer").currentTime = document.getElementById("player").currentTime;
			console.log("autocorrected time gap");
			console.log(diff);
			setTimeout(autoCorrect, 5000);
		} else if (diff < -0.15) {
			document.getElementById("aPlayer").currentTime = document.getElementById("player").currentTime;
			console.log("autocorrected time gap");
			console.log(diff);
			setTimeout(autoCorrect, 5000);
		} else {
			setTimeout(autoCorrect, 5000);
		}
	} else {
		setTimeout(autoCorrect, 5000);
	}
}

function theater(t) {
	if (!t) {
		if (!localStorage.getItem("theaterNew") | localStorage.getItem("theaterNew") == "n") {
			document.getElementById("vinf").style = "width:100%";
			document.getElementById("rlv").style = "width:100%";
			document.getElementById("player").style = "max-height:750px";
			for (var c in document.getElementById("relatedFeed").querySelectorAll("a div img")) {
				document.getElementById("relatedFeed").querySelectorAll("a div img")[c].style = "height:75%";
			}
			localStorage.setItem("theaterNew", "y");
		} else {
			document.getElementById("vinf").style = "width:60%";
			document.getElementById("rlv").style = "width:35%";
			document.getElementById("player").style = "max-height:630px";
			for (var c in document.getElementById("relatedFeed").querySelectorAll("a div img")) {
				document.getElementById("relatedFeed").querySelectorAll("a div img")[c].style = "height:92%";
			}
			localStorage.setItem("theaterNew", "n");
		}
	} else {
		if (t == "update") {
			if (localStorage.getItem("theaterNew") == "y") {
				document.getElementById("vinf").style = "width:100%";
				document.getElementById("rlv").style = "width:100%";
				document.getElementById("player").style = "max-height:750px";
				for (var c in document.getElementById("relatedFeed").querySelectorAll("a div img")) {
					document.getElementById("relatedFeed").querySelectorAll("a div img")[c].style = "height:75%";
				}
			}
		}
	}
}

function load() {
	var id = window.location.search.split("?v=")[1];
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
						if (!json.audio[c].isDashMPD && !json.audio[c].isHLS) {
							var opt = document.createElement("OPTION");
							opt.innerHTML = json.audio[c].audioBitrate + "kbps [" + json.audio[c].codecs + "]";
							opt.value = json.audio[c].itag;
							document.getElementById("a").appendChild(opt);
						}
					}
					for (var c in json.video) {
						if (!json.video[c].isDashMPD && !json.video[c].isHLS) {
							if (localStorage.getItem("ov") == "enabled") {
								var opt = document.createElement("OPTION");
								opt.innerHTML = json.video[c].qualityLabel + " [" + json.video[c].codecs + "]";
								opt.value = json.video[c].itag;
								document.getElementById("v").appendChild(opt);
							} else {
								var w = window.screen.width;
								var h = window.screen.height;
								if (w > h) {
									var hori = true;
								} else {
									var hori = false;
								}
								if (hori == true) {
									if (w < json.video[c].width) {
										var isOver = true;
									} else {
										var isOver = false;
									}
								} else if (hori == false) {
									if (h < json.video[c].height) {
										var isOver = true;
									} else {
										var isOver = false;
									}
								}
								if (isOver == false) {
									if (localStorage.getItem("vp9") == "enabled") {
										if (json.video[c].videoCodec == "vp9") {
											console.log("ignored because codec is vp9");
										} else {
											var opt = document.createElement("OPTION");
											opt.innerHTML = json.video[c].qualityLabel + " [" + json.video[c].codecs + "]";
											opt.value = json.video[c].itag;
											document.getElementById("v").appendChild(opt);
										}
									} else {
										var opt = document.createElement("OPTION");
										opt.innerHTML = json.video[c].qualityLabel + " [" + json.video[c].codecs + "]";
										opt.value = json.video[c].itag;
										document.getElementById("v").appendChild(opt);
									}
								}
							}
						}
					}
					if (document.getElementById("v").options[0] && document.getElementById("a").options[0]) {
						document.getElementById("player").src = getItag(document.getElementById("v").options[0].value);
						document.getElementById("aPlayer").src = getItag(document.getElementById("a").options[0].value);
					} else {
						document.getElementById("sqSB").style.display = "none";
						document.getElementById("qSB").style.display = "";
						for (var c in json.joined) {
							if (localStorage.getItem("ov") == "enabled") {
								var opt = document.createElement("OPTION");
								opt.innerHTML = json.joined[c].qualityLabel + " (" + json.joined[c].audioBitrate + " audio kbps) [" + json.joined[c].codecs + "]";
								opt.value = json.joined[c].itag;
								document.getElementById("va").appendChild(opt);
							} else {
								var w = window.screen.width;
								var h = window.screen.height;
								if (w > h) {
									var hori = true;
								} else {
									var hori = false;
								}
								if (hori == true) {
									if (w < json.joined[c].width) {
										var isOver = true;
									} else {
										var isOver = false;
									}
								} else if (hori == false) {
									if (h < json.joined[c].height) {
										var isOver = true;
									} else {
										var isOver = false;
									}
								}
								if (isOver == false) {
									if (localStorage.getItem("vp9") == "enabled") {
										if (json.joined[c].videoCodec == "vp9") {
											console.log("ignored because codec is vp9");
										} else {
											var opt = document.createElement("OPTION");
											opt.innerHTML = json.joined[c].qualityLabel + " (" + json.joined[c].audioBitrate + " audio kbps) [" + json.joined[c].codecs + "]";
											opt.value = json.joined[c].itag;
											document.getElementById("va").appendChild(opt);
										}
									} else {
										var opt = document.createElement("OPTION");
										opt.innerHTML = json.joined[c].qualityLabel + " (" + json.joined[c].audioBitrate + " audio kbps) [" + json.joined[c].codecs + "]";
										opt.value = json.joined[c].itag;
										document.getElementById("va").appendChild(opt);
									}
								} else {
									console.log("skipped quality due to overscan settings")
								}
							}
						}
						if (!document.getElementById("va").options[0]) {
							document.getElementById("loader").style.display = "none";
							document.getElementById("err").style.display = "";
							document.getElementById("errTxt").innerHTML = "Couldn't find any valid formats!";
							return;
						} else {
							document.getElementById("player").src = getItag(document.getElementById("va").options[0].value);
							document.getElementById("player").load();
						}
					}
					document.getElementById("player").load();
					document.getElementById("aPlayer").load();
					document.getElementById("volume").value = (document.getElementById("aPlayer").volume) * 100;
				} else {
					document.getElementById("sqSB").style.display = "none";
					document.getElementById("qSB").style.display = "";
					for (var c in json.joined) {
						if (localStorage.getItem("ov") == "enabled") {
							var opt = document.createElement("OPTION");
							opt.innerHTML = json.joined[c].qualityLabel + " (" + json.joined[c].audioBitrate + " audio kbps) [" + json.joined[c].codecs + "]";
							opt.value = json.joined[c].itag;
							document.getElementById("va").appendChild(opt);
						} else {
							var w = window.screen.width;
							var h = window.screen.height;
							if (w > h) {
								var hori = true;
							} else {
								var hori = false;
							}
							if (hori == true) {
								if (w < json.joined[c].width) {
										var isOver = true;
									} else {
										var isOver = false;
									}
							} else if (hori == false) {
								if (h < json.joined[c].width) {
									var isOver = true;
								} else {
									var isOver = false;
								}
							}
							console.log(isOver)
							if (isOver == false) {
								var opt = document.createElement("OPTION");
								opt.innerHTML = json.joined[c].qualityLabel + " [" + json.joined[c].codecs + "]";
								opt.value = json.joined[c].itag;
								document.getElementById("va").appendChild(opt);
							} 
						}
					}
					if (!document.getElementById("va").options[0]) {
						document.getElementById("loader").style.display = "none";
						document.getElementById("err").style.display = "";
						document.getElementById("errTxt").innerHTML = "Couldn't find any valid formats!";
						return;
					} else {
						document.getElementById("player").src = getItag(document.getElementById("va").options[0].value);
						document.getElementById("player").load();
					}
				}
				document.getElementById("player").poster = "/api/thumb/" + id;
				document.getElementById("title").innerHTML = json.info.videoDetails.title;
				if (json.info.videoDetails.author.avatar) {
					document.getElementById("authIco").src = json.info.videoDetails.author.avatar;
				} else {
					document.getElementById("authIco").src = "/img/default.jpg";
				}
				document.getElementById("viewCount").innerHTML = parseInt(json.info.videoDetails.viewCount).toLocaleString() + " views";
				document.getElementById("pText").innerHTML = parseDate(json.info.videoDetails.publishDate);
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
					document.getElementById("ldBit").style.display = "";
					document.getElementById("l").innerHTML = json.info.videoDetails.likes.toLocaleString();
					document.getElementById("dl").innerHTML = json.info.videoDetails.dislikes.toLocaleString();
					var tot = json.info.videoDetails.likes + json.info.videoDetails.dislikes;
					var rat = (json.info.videoDetails.likes / tot) * 100;
					document.getElementById("rBar").style = "width:" + rat + "%";
				} else {
					document.getElementById("ldBit").style.display = "none";
				}
				document.title = json.info.videoDetails.title + " | VidPolaris";
				document.getElementById("main").style.display = "";
				loaded();
				for (var c in json.info.related_videos) {
					var l = document.createElement("A");
					l.href = "watch?v=" + json.info.related_videos[c].id;
					var vidChip = document.createElement("DIV");
					vidChip.classList.add("horiVidChip");
					var img = document.createElement("IMG");
					img.src = "/api/thumb/" + json.info.related_videos[c].id;
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
				if (localStorage.getItem("theaterNew") == "y") {
					for (var c in document.getElementById("relatedFeed").querySelectorAll("a div img")) {
						document.getElementById("relatedFeed").querySelectorAll("a div img")[c].style = "height:75%";
					}
				}
			} else {
				document.getElementById("loader").style.display = "none";
				document.getElementById("err").style.display = "";
				document.getElementById("errTxt").innerHTML = json.err;
			}
		} 
	}
}

function loaded() {
	if (localStorage.getItem("sq") && localStorage.getItem("sq") == "enabled") {
		if (localStorage.getItem("actg") && localStorage.getItem("atcg") == "enabled") {
			autoCorrect();
		}
	}
	if (!localStorage.getItem("pv") | localStorage.getItem("pv") == "enabled") {
		document.getElementById("player").play();
	}
	if (!localStorage.getItem("autoCom") | localStorage.getItem("autoCom") == "y") {
		getComm();
	} else {
		document.getElementById("commStatus").innerHTML = "<a href='#' onclick='loadComm()'>Load the comments</a>"
	}
}

function getItag(itag, type) {
	if (sessionStorage.getItem("info")) {
		if (document.getElementById("main").style.display == "" && type) {
			sessionStorage.setItem("prog", document.getElementById("player").currentTime);
			if (document.getElementById("aPlayer").src) {
				document.getElementById("aPlayer").pause();
			}
			document.getElementById("player").pause();
		}
		var json = JSON.parse(sessionStorage.getItem("info"));
		var formats = json.info.formats;
		for (var c in formats) {
			if (formats[c].itag == parseInt(itag)) {
				if (type == "v") {
					document.getElementById("player").src = formats[c].url;
					if (sessionStorage.getItem("prog")) {
						document.getElementById("player").currentTime = parseInt(sessionStorage.getItem("prog"));
						if (document.getElementById("aPlayer").src) {
							document.getElementById("aPlayer").currentTime = parseInt(sessionStorage.getItem("prog"));
						}
						if (parseInt(sessionStorage.getItem("prog")) > 1) {
							document.getElementById("player").play();
						}
						sessionStorage.removeItem("prog");
					}
				} else if (type == "a") {
					document.getElementById("aPlayer").src = formats[c].url;
					if (sessionStorage.getItem("prog")) {
						document.getElementById("aPlayer").currentTime = parseInt(sessionStorage.getItem("prog"));
						document.getElementById("player").currentTime = parseInt(sessionStorage.getItem("prog"));
						if (parseInt(sessionStorage.getItem("prog")) > 1) {
							document.getElementById("player").play();
						}
						sessionStorage.removeItem("prog");
					}
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

function parseDate(string) {
	if (string.split("-").length == 3) {
		var year = string.split("-")[0];
		var month = parseInt(string.split("-")[1]);
		var day = parseInt(string.split("-")[2]);
		if (month == 1) { var m = "January"; } 
		else if (month == 2) { var m = "February"; }
		else if (month == 3) { var m = "March"; }
		else if (month == 4) { var m = "April"; }
		else if (month == 5) { var m = "May"; }
		else if (month == 6) { var m = "June"; }
		else if (month == 7) { var m = "July"; }
		else if (month == 8) { var m = "August"; }
		else if (month == 9) { var m = "September"; }
		else if (month == 10) { var m = "October"; }
		else if (month == 11) { var m = "November"; }
		else if (month == 12) { var m = "December"; }
		else { var m = null; }
		var dat = m + " " + day + ", " + year
		return dat;
	} else {
		return string;
	}
}

function autoplay(val) {
	val = val.toString();
	localStorage.setItem("ap", val);
}

function getComm() {
	document.getElementById("commStatus").innerHTML = "Loading comments...";
	document.getElementById("commentContainer").innerHTML = "";
	var xhr = new XMLHttpRequest();
	var id = window.location.search.split("?v=")[1];
	xhr.open("GET", "/api/comments?id=" + id);
	xhr.send();
	xhr.onload = function () {
		var json = JSON.parse(xhr.responseText);
		document.getElementById("commStatus").innerHTML = "Loaded " + json.length + " comments.";
		for (var c in json) {
			if (json[c].text == undefined) {continue;}
			var div = document.createElement("DIV");
			div.classList.add("comment");
			var img = document.createElement("IMG");
			img.src = json[c].authorThumb
			div.appendChild(img);
			var name = document.createElement("H2");
			name.innerHTML = json[c].author;
			div.appendChild(name);
			var t = document.createElement("P");
			t.innerHTML = json[c].text;
			div.appendChild(t);
			document.getElementById("commentContainer").appendChild(div);
		}
	}
}