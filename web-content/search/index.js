load();

function load() {
	var q = window.location.search.split("?q=")[1];
	if (q == "") {
		window.open("/", "_self");
	} else {
		document.getElementById("deet").innerHTML = "requesting server...";
		var xhr = new XMLHttpRequest();
		xhr.open("GET","/api/search?q="+q);
		xhr.send();
		xhr.onload = function () {
			var json = JSON.parse(xhr.responseText);
			document.getElementById("query").innerHTML = decodeURI(q);
			if (json.err) {
				
			} else {
				for (var c in json.items) {
					var link = document.createElement("A");
					var chip = document.createElement("DIV");
					document.getElementById("searchResults").appendChild(chip);
					if (json.items[c].type == "video") {
						link.href = "watch?v=" + json.items[c].link.substring(32);
						chip.classList.add("largeHoriChip");
						var img = document.createElement("IMG");
						img.classList.add("bImg");
						img.src = "/api/thumb/" + json.items[c].link.substring(32);
						chip.appendChild(img);
						var d = document.createElement("DIV");
						d.classList.add("inner");
						var tit = document.createElement("H2");
						tit.innerHTML = json.items[c].title;
						d.appendChild(tit);
						var aut = document.createElement("H3");
						var aut_ico = document.createElement("SPAN");
						aut_ico.classList.add("material-icons");
						aut_ico.innerHTML = "person";
						aut.appendChild(aut_ico);
						aut.innerHTML = aut.innerHTML + " " + json.items[c].author.name;
						d.appendChild(aut);
						if (json.items[c].views) {
							var viw = document.createElement("H3");
							var viw_ico = document.createElement("SPAN");
							viw_ico.classList.add("material-icons");
							viw_ico.innerHTML = "visibility";
							viw.appendChild(viw_ico);
							viw.innerHTML = viw.innerHTML + " " + json.items[c].views.toLocaleString() + " views";
							d.appendChild(viw);
						}
						var dsc = document.createElement("P");
						dsc.innerHTML = json.items[c].description;
						d.appendChild(dsc);
						chip.appendChild(d);
						link.appendChild(chip);
						document.getElementById("searchResults").appendChild(link);
					} else if (json.items[c].type == "channel") {
						link.href = "c?" + json.items[c].channel_id;
						chip.classList.add("largeHoriChip");
						var img = document.createElement("IMG");
						img.classList.add("bImg");
						img.src = "/api/proxy?url=" + btoa(json.items[c].avatar.split("=s")[0]);
						img.classList.add("square");
						chip.appendChild(img);
						var d = document.createElement("DIV");
						d.classList.add("inner");
						var nam = document.createElement("H2");
						nam.innerHTML = json.items[c].name;
						d.appendChild(nam);
						var vidC = document.createElement("H3");
						var vidC_ico = document.createElement("SPAN");
						vidC_ico.classList.add("material-icons");
						vidC_ico.innerHTML = "video_library";
						vidC.appendChild(vidC_ico);
						vidC.innerHTML = vidC.innerHTML + " " + json.items[c].videos.toLocaleString() + " videos";
						d.appendChild(vidC);
						var des = document.createElement("P");
						des.innerHTML = json.items[c].description_short;
						d.appendChild(des);
						chip.appendChild(d);
						link.appendChild(chip);
						document.getElementById("searchResults").appendChild(link);
					} else if (json.items[c].type == "playlist") {
						link.href = "p?" + json.items[c].link.substring(38);
						chip.classList.add("largeHoriChip");
						var img = document.createElement("IMG");
						img.classList.add("bImg");
						img.src = "/api/proxy?url=" + btoa(json.items[c].thumbnail.split("?")[0]);
						chip.appendChild(img);
						var d = document.createElement("DIV");
						d.classList.add("inner");
						var tit = document.createElement("H2");
						tit.innerHTML = json.items[c].title;
						d.appendChild(tit);
						var aut = document.createElement("H3");
						var aut_ico = document.createElement("SPAN");
						aut_ico.classList.add("material-icons");
						aut_ico.innerHTML = "person";
						aut.appendChild(aut_ico);
						aut.innerHTML = aut.innerHTML + " " + json.items[c].author.name;
						d.appendChild(aut);
						var len = document.createElement("H3");
						var len_ico = document.createElement("SPAN");
						len_ico.classList.add("material-icons");
						len_ico.innerHTML = "ondemand_video";
						len.appendChild(len_ico);
						len.innerHTML = len.innerHTML + " " + json.items[c].length;
						d.appendChild(len);
						chip.appendChild(d);
						link.appendChild(chip);
						document.getElementById("searchResults").appendChild(link);
					}
				}
				document.getElementById("main").style.display = "";
				document.getElementById("loader").style.display = "none";
			}
		}
	}
}