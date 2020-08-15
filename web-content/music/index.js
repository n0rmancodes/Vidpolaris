load();

function load() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET","/api/deezer/charts");
    xhr.send();
    xhr.onload = function () {
        var json = JSON.parse(xhr.responseText);
        for (var c in json) {
            var div = document.createElement("DIV");
            div.id = json[c].id.toString();
            div.onclick = function() {openTrack(this.id)};
            var img = document.createElement("IMG");
            img.src = "/api/proxy?url=" + btoa(json[c].album.cover_big);
            div.appendChild(img);
            var title = document.createElement("H4");
            title.innerHTML = json[c].title;
            div.appendChild(title);
            var author = document.createElement("H5");
            author.innerHTML = json[c].artist.name;
            div.appendChild(author);
            document.getElementById("chart").appendChild(div);
        }
    }
}