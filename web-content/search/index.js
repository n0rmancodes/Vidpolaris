load();

function load() {
	if (q == "") {
		window.open("/", "_self");
	} else {
		var q = window.location.search.split("?q=")[1];
		document.getElementById("query").innerHTML = decodeURI(q);
		document.getElementById("deet").innerHTML = "requesting server...";
		if (!localStorage.getItem("search") | localStorage.getItem("search") == "yt") {
			ytSearch();
		} else {
			redditSearch();
		}
	}
}

function ytSearch() {
	var xhr = new XMLHttpRequest();
	var q = window.location.search.split("?q=")[1];
	xhr.open("GET","/api/search?q="+q);
	xhr.send();
	xhr.onload = function () {
		var json = JSON.parse(xhr.responseText);
		if (json.err) {
			if (localStorage.getItem("search") !== "reddit") {
				document.getElementById("deet").innerHTML = "attempting to fallback...";
				redditSearch();
			} else {
				document.getElementById("loader").style.display = "none";
				document.getElementById("err").style.display = "";
				document.getElementById("errTxt").innerHTML = json.err;
			}
		} else {
			for (var c in json.items) {
				var link = document.createElement("A");
				var chip = document.createElement("DIV");
				document.getElementById("searchResults").appendChild(chip);
				if (json.items[c].type == "video") {
					link.href = "/watch?v=" + json.items[c].link.substring(32);
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
					link.href = "/channel/?" + json.items[c].channel_id;
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
					link.href = "/playlist?list=" + json.items[c].link.substring(38);
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
			if (localStorage.getItem("search") !== "yt") {
				document.getElementById("fbSource").innerHTML = "YouTube";
				document.getElementById("fallbackNotice").style.display = "";
			}
		}
	}
}

function redditSearch() {
	var xhr = new XMLHttpRequest();
	var q = window.location.search.split("?q=")[1];
	xhr.open("GET", "/api/search?src=reddit&q=" + q);
	xhr.send();
	xhr.onload = function () {
		var json = removeDuplicates(JSON.parse(xhr.responseText), "id");
		console.log(json)
		for (var c in json) {
			var a = document.createElement("A");
			a.href = "/watch?v=" + json[c].id;
			var chip = document.createElement("DIV");
			chip.classList.add("largeHoriChip");
			var img = document.createElement("IMG");
			img.classList.add("bImg");
			img.src = "/api/thumb/" + json[c].id;
			document.getElementById("searchResults").appendChild(a);
			var d = document.createElement("DIV");
			d.classList.add("inner");
			var tit = document.createElement("H2");
			tit.innerHTML = json[c].title;
			d.appendChild(tit);
			var aut = document.createElement("H3");
			var aut_ico = document.createElement("SPAN");
			aut_ico.classList.add("material-icons");
			aut_ico.innerHTML = "person";
			aut.appendChild(aut_ico);
			aut.innerHTML = aut.innerHTML + " " + json[c].author;
			d.appendChild(aut);
			var upv = document.createElement("H3");
			var upv_ico = document.createElement("SPAN");
			upv_ico.classList.add("material-icons");
			upv_ico.innerHTML = "arrow_upward";
			upv.appendChild(upv_ico);
			if (json[c].upvoteCount) {
				var up = json[c].upvoteCount;
			} else {
				var up = 0;
			}
			upv.innerHTML = upv.innerHTML + " " + up.toLocaleString() + " upvotes on " + json[c].subreddit;
			d.appendChild(upv);
			chip.appendChild(img);
			chip.appendChild(d);
			a.appendChild(chip);
		}
		document.getElementById("main").style.display = "";
		document.getElementById("loader").style.display = "none";
		if (!localStorage.getItem("search") | localStorage.getItem("search") !== "reddit") {
			document.getElementById("fbSource").innerHTML = "Reddit";
			document.getElementById("fallbackNotice").style.display = "";
		}
	}
}

function removeDuplicates( arr, prop ) {
	var obj = {};
  	for ( var i = 0, len = arr.length; i < len; i++ ){
   	 	if(!obj[arr[i][prop]]) obj[arr[i][prop]] = arr[i];
  	}
  	var newArr = [];
  	for ( var key in obj ) newArr.push(obj[key]);
 	return newArr;
}