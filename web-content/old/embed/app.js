document.getElementById("noJS").style.display = "none";
document.getElementById("wait").style.display = "";
const http = new XMLHttpRequest();
var id = window.location.hash.substring(3);
var url = "https://youtube.com/watch?v=" + id;
http.open('GET','/api/info?url=' + url);
http.send();
http.onload=(e)=>{
	var d = JSON.parse(http.responseText);
	if (d.info && !d.err) {
		if (d.info.playerResponse.playabilityStatus.status == "OK" && d.info.formats[0].url) {
			document.getElementById("player").src = d.info.formats[0].url;
			document.getElementById("wait").style.display = "none";
			document.getElementById("hplayer").style.display = "";
			document.getElementById("player").play();
		} else if (!d.info.playerResponse.playabilityStatus.status == "OK") {
			console.log(d.info.playerResponse.playabilityStatus.status + " | " + d.info.playerResponse.playabilityStatus.reason);
		}
	} else {
		if (!d.err) {
			embed();
		} else {
			document.getElementById("err").style.display = "";
			document.getElementById("wait").style.display = "none";
			console.log(d.err);
		}
	}
}

function getClickedId(parentString, substring) {
    return parentString.substring(parentString.indexOf(substring) + substring.length)
}

function embed() {
	document.getElementById("noJS").style.display = "none";
	document.getElementById("wait").style.display = "";
	if (window.location.href.includes("#w#")) {
		const http = new XMLHttpRequest();
		var id = window.location.hash.substring(3)
		var url = "https://youtube.com/watch?v=" + id;
		http.open('GET','https://vidpolaris.herokuapp.com/?info=1&url=' + url);
		http.send();
		http.onload=(e)=>{
			var d = JSON.parse(http.responseText);
			if (d.info) {
				if (d.info.playerResponse.playabilityStatus.status == "OK" && d.info.formats[0].url) {
					document.getElementById("player").src = d.info.formats[0].url;
					document.getElementById("wait").style.display = "none";
					document.getElementById("hplayer").style.display = "";
					document.getElementById("player").play();
				}
			} else {
				if (!d.err) {
					embed();
				} else {
					document.getElementById("err").style.display = "";
					document.getElementById("wait").style.display = "none";
					console.log(d.err);
				}
			}
		}
	} else {
		
	}
}

function toggle(a) {
	if (a == "state") {
		if (document.getElementById("player").playing == true) {
			document.getElementById("player").pause();
		} else {
			document.getElementById("player").play();
		}
	}
}