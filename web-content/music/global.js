if (document.getElementById("p")) {
    document.getElementById("p").addEventListener("timeupdate", function () {
        sessionStorage.setItem("time", document.getElementById("p").currentTime);
        sessionStorage.setItem("cTime", new Date() * 1)
        var prog = (document.getElementById("p").currentTime / document.getElementById("p").duration) * 100;
        document.getElementById("in").style = "width:" + prog + "%;"
    })
    document.getElementById("p").addEventListener("pause", function () {
        sessionStorage.setItem("time", document.getElementById("p").currentTime);
        sessionStorage.setItem("status", "paused");
        document.getElementById("togglePlayback").innerHTML = "Play";
    })
    document.getElementById("p").addEventListener("play", function () {
        document.getElementById("togglePlayback").innerHTML = "Pause";
        sessionStorage.setItem("status", "play");
    })
    document.getElementById("p").addEventListener("play", function () {
        document.getElementById("togglePlayback").innerHTML = "Pause";
        sessionStorage.setItem("status", "play");
    })
}

if (sessionStorage.getItem("id") && sessionStorage.getItem("time")) {
    if (!sessionStorage.getItem("cTime")) {
        openTrack(sessionStorage.getItem("id"), sessionStorage.getItem("time"))
    } else {
        var time = parseInt(sessionStorage.getItem("cTime"));
        var cTime = new Date() * 1;
        if (cTime - time >= 86400000) {
            openTrack(sessionStorage.getItem("id"), sessionStorage.getItem("time"));
        } else {
            openTrackFromStorage(sessionStorage.getItem("time"));
        }
    }
}

function openTrack(id, goTo) {
    document.getElementById("player").style.display = "none";
    document.getElementById("playerLoading").style.display = "";
    document.getElementById("p").pause(); 
    var xhr = new XMLHttpRequest();
    xhr.open("GET","/api/deezer?type=song&id=" + id);
    xhr.send();
    xhr.onload = function () {
        sessionStorage.setItem("currentStatus", xhr.responseText);
        var json = JSON.parse(xhr.responseText);
        sessionStorage.setItem("id", json.deezer.id);
        sessionStorage.setItem("oldTitle", document.title);
        let compat = [];
        for (var c in json.ytdl) {
            if (json.ytdl[c].isHLS == false && json.ytdl[c].isDashMPD == false) {
                compat.push(json.ytdl[c]);
            }
        }
        if (compat[0]) {
            document.getElementById("p").src = compat[0].url;
        }
        sessionStorage.setItem("playerSrc", document.getElementById("p").src)
        document.getElementById("player").style.display = "";
        document.getElementById("playerLoading").style.display = "none";
        if (!goTo) {
            document.getElementById("p").play();
        } else {
            var goto = parseInt(goTo);
            document.getElementById("p").currentTime = goto;
            setTimeout(function () {
                if (document.getElementById("p").playerState >= 3) {
                    document.getElementById("p").play();
                    document.getElementById("p").removeEventListener("playerState", r);
                }
            }, 500)
        }
        document.getElementById("cover").src = json.deezer.album.cover_medium;
        document.getElementById("title").innerHTML = json.deezer.title;
        document.getElementById("artP").innerHTML = json.deezer.artist.name;
        document.getElementById("albP").innerHTML = json.deezer.album.title;
        document.getElementById("tiLink").href = "/music/album#" + json.deezer.album.id + "#" + json.deezer.id;
        document.getElementById("arLink").href = "/music/artist#" + json.deezer.artist.id;
        document.getElementById("alLink").href = "/music/album#" + json.deezer.album.id;
        document.title = json.deezer.title + " - " + json.deezer.artist.name + " | VidPolaris Music";
    }
}

function openTrackFromStorage(time) {
    document.getElementById("playerLoading").style.display = "";
    var json = JSON.parse(sessionStorage.getItem("currentStatus"));
    document.getElementById("p").src = sessionStorage.getItem("playerSrc");
    if (time) {
        time = parseInt(time);
        document.getElementById("p").currentTime = time;
        document.getElementById("p").load();
    } else {
        document.getElementById("p").load();
    }
    document.getElementById("cover").src = json.deezer.album.cover_medium;
    document.getElementById("title").innerHTML = json.deezer.title;
    document.getElementById("artP").innerHTML = json.deezer.artist.name;
    document.getElementById("albP").innerHTML = json.deezer.album.title;
    document.getElementById("tiLink").href = "/music/album#" + json.deezer.album.id + "#" + json.deezer.id;
    document.getElementById("arLink").href = "/music/artist#" + json.deezer.artist.id;
    document.getElementById("alLink").href = "/music/album#" + json.deezer.album.id;
    document.title = json.deezer.title + " - " + json.deezer.artist.name + " | VidPolaris Music";
    document.getElementById("player").style.display = "";
    document.getElementById("playerLoading").style.display = "none";
}

function togglePlayback() {
    if (document.getElementById("p")) {
        if (document.getElementById("p").paused) {
            document.getElementById("togglePlayback").innerHTML = "Pause";
            document.getElementById("p").play();
        } else {
            document.getElementById("togglePlayback").innerHTML = "Play";
            document.getElementById("p").pause();
        }
    }
}

function toggleLoop() {
    if (document.getElementById("p")) {
        if (document.getElementById("p").getAttribute("loop") == "true") {
            document.getElementById("p").removeAttribute("loop");
            document.getElementById("toggleLoop").classList.remove("active");
        } else {
            document.getElementById("p").setAttribute("loop", "true");
            document.getElementById("toggleLoop").classList.add("active")
        }
    }
}

function search() {
    if (document.getElementById("q")) {
        var q = document.getElementById("q").value;
        window.open("/music/search#" + q, "_self");
        if (window.location.pathname == "/music/search") {
            window.location.reload();
        }
    }
}

function closePlayer() {
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("time");
    sessionStorage.removeItem("state");
    if (sessionStorage.getItem("oldTitle")) {
        document.title = sessionStorage.getItem("oldTitle");
    }
    document.getElementById("player").style.display = "none";
    document.getElementById("p").pause();
}