load();

function load() {
    if (!window.location.href.split.length == 1) {
        
    } else {
        var xhr = new XMLHttpRequest();
        var id = window.location.href.split("#")[1];
        xhr.open("GET", "/api/deezer?type=artist&id=" + id);
        xhr.send();
        xhr.onload = function() {
            var json = JSON.parse(xhr.responseText);
            document.getElementById("load").style.display = "none";
            document.getElementById("content").style.display = "";
            document.getElementById("artCover").src = "/api/proxy?url=" + btoa(json.info.picture_xl);
            document.getElementById("artName").innerHTML = json.info.name;
            document.getElementById("albCount").innerHTML = json.info.nb_album.toLocaleString();
            document.getElementById("fanCount").innerHTML = json.info.nb_fan.toLocaleString();
            for (var c in json.topTracks) {
                var a = document.createElement("A");
                var d = document.createElement("DIV");
                d.id = json.topTracks[c].id.toString();
                d.onclick = function() {openTrack(this.id)};
                d.classList.add("chip");
                var img = document.createElement("IMG");
                img.src = "/api/proxy?url=" + btoa(json.topTracks[c].album.cover_medium);
                d.appendChild(img);
                var div = document.createElement("DIV");
                var tit = document.createElement("H3");
                tit.innerHTML = json.topTracks[c].title;
                div.appendChild(tit);
                var alb = document.createElement("H4");
                var alb_ico = document.createElement("SPAN");
                alb_ico.classList.add("material-icons");
                alb_ico.innerHTML = "album";
                alb.appendChild(alb_ico);
                alb.innerHTML = alb.innerHTML + " " + json.topTracks[c].album.title;
                div.appendChild(alb);
                if (json.topTracks[c].contributors.length > 1) {
                    var contrib = document.createElement("H4");
                    var c_ico = document.createElement("SPAN");
                    c_ico.classList.add("material-icons");
                    c_ico.innerHTML = "person_add";
                    contrib.appendChild(c_ico);
                    for (let d = 1; d < json.topTracks[c].contributors.length; d++) {
                        if (d == 1) {
                            contrib.innerHTML = contrib.innerHTML + " " + json.topTracks[c].contributors[d].name;
                        } else {
                            contrib.innerHTML = contrib.innerHTML + ", " + json.topTracks[c].contributors[d].name;
                        }
                    }
                    div.appendChild(contrib);
                }
                d.appendChild(div)
                a.appendChild(d);
                document.getElementById("hotFeed").appendChild(a)
            }
            for (var c in json.albumList) {
                var a = document.createElement("A");
                a.href = "/music/album/#" + json.albumList[c].id;
                var d = document.createElement("DIV");
                d.classList.add("chip");
                var img = document.createElement("IMG");
                img.src = "/api/proxy?url=" + btoa(json.albumList[c].cover_medium);
                var div = document.createElement("DIV");
                var tit = document.createElement("H3");
                tit.innerHTML = json.albumList[c].title;
                if (json.albumList[c].record_type == "single") {
                    var ico = document.createElement("SPAN");
                    ico.classList.add("material-icons");
                    ico.innerHTML = "audiotrack";
                    tit.innerHTML = tit.innerHTML + " ";
                    tit.appendChild(ico);
                } else {
                    var ico = document.createElement("SPAN");
                    ico.classList.add("material-icons");
                    ico.innerHTML = "album";
                    tit.innerHTML = tit.innerHTML + " ";
                    tit.appendChild(ico);
                }
                div.appendChild(tit);
                var fan = document.createElement("H4");
                var fan_ico = document.createElement("SPAN");
                fan_ico.classList.add("material-icons");
                fan_ico.innerHTML = "person";
                fan.appendChild(fan_ico);
                fan.innerHTML = fan.innerHTML + " " + json.albumList[c].fans.toLocaleString() + " fans";
                div.appendChild(fan);
                d.appendChild(img);
                d.appendChild(div);
                a.appendChild(d);
                document.getElementById("albFeed").appendChild(a);
            }
            document.title = json.info.name + " | VidPolaris Music";
        }
    }
}