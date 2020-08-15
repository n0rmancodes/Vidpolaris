load();

function load() {
    if (window.location.href.split("#").length == 2 | window.location.href.split("#").length == 3) {
        var xhr = new XMLHttpRequest();
        if (window.location.href.split("#").length == 1) {
            var id = window.location.href.split("#")[1];
        } else {
            var id = window.location.href.split("#")[1].split("#")[0];
        }
        xhr.open("GET", "/api/deezer?type=album&id=" + id);
        xhr.send();
        xhr.onload = function () {
            var json = JSON.parse(xhr.responseText);
            document.getElementById("load").style.display = "none";
            document.getElementById("content").style.display = "";
            document.getElementById("artCover").src = json.cover_big;
            document.getElementById("albumName").innerHTML = json.title;
            document.title = json.title + " | VidPolaris Music";
            document.getElementById("fanCount").innerHTML = json.fans.toLocaleString();
            document.getElementById("trackCount").innerHTML = json.nb_tracks.toLocaleString();
            document.getElementById("recordLabel").innerHTML = json.label;
            if (json.contributors.length > 1) {
                for (var c in json.contributors) {
                    var a = document.createElement("A");
                    a.href = "/music/artist#" + json.contributors[c].id;
                    var n = document.createElement("SPAN");
                    n.innerHTML = json.contributors[c].name;
                    n.classList.add("hoverline");
                    a.appendChild(n);
                    a.innerHTML = a.innerHTML + " (" + json.contributors[c].role + "), ";
                    document.getElementById("contribList").appendChild(a);
                } 
            } else {
                var a = document.createElement("A");
                a.href = "/music/artist#" + json.contributors[c].id;
                var n = document.createElement("SPAN");
                n.innerHTML = json.contributors[c].name;
                n.classList.add("hoverline");
                a.appendChild(n);
                a.innerHTML = a.innerHTML + " (" + json.contributors[c].role + ")";
                document.getElementById("contribList").appendChild(a);
            }
        }
    }
}

function highlightId(id) {

}