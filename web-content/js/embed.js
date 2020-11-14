load();

function load() {
	document.getElementById("l").innerHTML = "Retrieving metadata...";
    var xhr = new XMLHttpRequest();
	var id = window.location.pathname.split("/embed/")[1].split("/")[0];
    document.getElementById("player").poster = "/api/thumb/" + id;
    xhr.open("GET", "/api/info?id=" + id);
    xhr.send();
    xhr.onload = function () {
        var json = JSON.parse(xhr.responseText);
        if (!json.err) {
            document.getElementById("player").src = json.joined[0].url;
        } else {
            document.getElementById("player").poster = "/undefined.jpg";
            document.getElementById("err").style.display = "";
            document.getElementById("errText").innerHTML = json.err;
        }
    }
}


document.getElementById("player").addEventListener("canplay", function() {
	document.getElementById("load").style.display = "none";
    document.getElementById("player").setAttribute("controls", "true");
})

document.getElementById("player").addEventListener("waiting", function() {
    document.getElementById("load").style.display = "block";
    document.getElementById("player").removeAttribute("controls");
	document.getElementById("l").innerHTML = "HTML5 Player is loading the data...";
})