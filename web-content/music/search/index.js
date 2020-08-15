load();

function load() {
    var xhr = new XMLHttpRequest();
    if (!window.location.href.split("#").length == 1) {

    } else {
        var q = window.location.href.split("#")[1]
        xhr.open("GET", "/api/deezer/search?q=" + q);
        xhr.send();
        xhr.onload = function () {
            var json = JSON.parse(xhr.responseText);
            document.getElementById("load").style.display = "none";
            document.getElementById("content").style.display = "";
            document.getElementById("query").innerHTML = decodeURI(q);
            for (var c in json) {
                var div = document.createElement("DIV");
                div.classList.add("chipLarger");
                div.id = json[c].id;
                div.onclick = function() {openTrack(this.id);};
                var img = document.createElement("IMG");
                img.src = "/api/proxy?url=" + btoa(json[c].album.cover_medium);
                div.appendChild(img);
                var d = document.createElement("DIV");
                var tit = document.createElement("H2");
                tit.innerHTML = json[c].title;
                d.appendChild(tit);
                var aut = document.createElement("H3");
                var aut_ico = document.createElement("SPAN");
                aut_ico.classList.add("material-icons");
                aut_ico.innerHTML = "person";
                aut.appendChild(aut_ico);
                var autLink = document.createElement("A");
                autLink.href = "/music/artist#" + json[c].artist.id;
                autLink.onclick = function () {return;};
                var autName = document.createElement("SPAN");
                autName.innerHTML = json[c].artist.name;
                autName.classList.add("hoverline");
                autLink.appendChild(autName);
                aut.appendChild(autLink);
                d.appendChild(aut);
                var alb = document.createElement("H3");
                var alb_ico = document.createElement("SPAN");
                alb_ico.classList.add("material-icons");
                alb_ico.innerHTML = "album";
                alb.appendChild(alb_ico);
                var albLink = document.createElement("A");
                albLink.href = "/music/album#" + json[c].album.id;
                var albName = document.createElement("SPAN");
                albName.innerHTML = json[c].album.title;
                albName.classList.add("hoverline");
                albLink.appendChild(albName);
                alb.appendChild(albLink);
                d.appendChild(alb);
                div.appendChild(d);
                document.getElementById("searchFeed").appendChild(div);
            }
        }
    }
}