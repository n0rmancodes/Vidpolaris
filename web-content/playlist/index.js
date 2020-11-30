load();

function load() {
    var id = window.location.search.split("list=")[1].split("&")[0];
	if (id) {
		document.getElementById("deet").innerHTML = "requesting server...";
		var xhr = new XMLHttpRequest();
		if (localStorage.getItem("instanceURL")) {
			var u = localStorage.getItem("instanceURL") + "/api/playlist?id=" + id + "&limit=Infinity";
		} else {
			var u = "/api/playlist?id=" + id + "&limit=Infinity";
		}
		xhr.open("GET", u);
		xhr.send();
		xhr.onload = function () {
            var json = JSON.parse(xhr.responseText);
            document.getElementById("loader").style.display = "none";
            if (json.err) {
                document.getElementById("err").style.display = "";
                document.getElementById("errTxt").innerHTML = json.err;
            } else {
                document.getElementById("main").style.display = "";
                document.getElementById("plTitle").innerHTML = json.title;
                document.title = json.title + " | VidPolaris";
                document.getElementById("thumb").src = "/api/thumb/" + json.items[0].id;
                document.getElementById("plLength").innerHTML = json.estimated_items.toLocaleString();
                document.getElementById("plViews").innerHTML = json.views.toLocaleString();
                for (var c in json.items) {
                    var link = document.createElement("A");
                    link.href = "/watch?v=" + json.items[c].id;
                    var chip = document.createElement("DIV");
                    chip.classList.add("smallHoriChip");
                    var img = document.createElement("IMG");
                    img.src = "/api/thumb/" + json.items[c].id;
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
                    chip.appendChild(img);
                    chip.appendChild(d);
                    link.appendChild(chip);
                    document.getElementById("playlistItems").appendChild(link);
                }
            }
        }
    }
}