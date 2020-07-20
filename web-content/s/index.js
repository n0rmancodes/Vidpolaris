load();

function load() {
	var q = window.location.search.substring(1);
	if (q == "") {
		window.open("/", "_self");
	} else {
		document.getElementById("deet").innerHTML = "requesting server...";
		var xhr = new XMLHttpRequest();
		xhr.open("GET","/api/search?q="+q);
		xhr.send();
		xhr.onload = function () {
			var json = JSON.parse(xhr.responseText);
			document.getElementById("query").innerHTML = q;
			if (json.err) {
				
			} else {
				for (var c in json.items) {
					var link = document.createElement("A");
					var chip = document.createElement("DIV");
					chip.classList.add("largeHoriChip");
					document.getElementById("searchResults").appendChild(chip);
					if (json.items[c].type == "video") {
						link.href = "w?" 
					}
					link.appendChild(chip);
					document.getElementById("searchResults").appendChild(link);
				}
				document.getElementById("main").style.display = "";
				document.getElementById("loader").style.display = "none";
			}
		}
	}
}