document.getElementById("noscript").style.display = "none";
console.log("script loaded.");
console.log("==================");
resize("auto");
const http = new XMLHttpRequest();
document.getElementById("homeLoadDeet").innerHTML = "waking server...";
if (localStorage.getItem("sLoc") == "a" | !localStorage.getItem("sLoc")) {
	var url = "https://vidpolaris.ml:9019/"
} else if (localStorage.getItem("sLoc") == "b"){
	var url = "https://vidpolaris.herokuapp.com"
} else if (localStorage.getItem("sLoc") == "c") {
	var url = "https://vidpolaris-europe.herokuapp.com/"
}
http.open("GET", url);
http.send();
http.onload=(e)=>{
	if (http.status == 404) {
		if (window.location.href.includes("#c") | window.location.href.includes("#redir") | window.location.href.includes("#w") | window.location.href.includes("#s") | window.location.href.includes("#adapt") | window.location.href.includes("#p")) {
			refresh();
		} else {
			home();
		}
	} else {
		document.getElementById("serverdown").style.display = "";
		document.getElementById("trendingLoader").style.display = "none";
	}
}
http.onerror=(e)=>{
	document.getElementById("serverdown").style.display = "";
	document.getElementById("trendingLoader").style.display = "none";
}
 

document.getElementById("trendingLoader").style.display = "";

// settings checkers
console.log("- removing unnecessary sessionStorage items...");

if (sessionStorage.getItem("currentlyRunningT")) {
	sessionStorage.removeItem("currentlyRunningT");
	console.log("-- removed 'currentlyRunningT' item");
}

if (sessionStorage.getItem("currentlyOpening")) {
	sessionStorage.removeItem("currentlyOpening");
	console.log("-- removed 'currentlyOpening' item");
}

if (sessionStorage.getItem("noUploads")) {
	sessionStorage.removeItem("noUploads");
	console.log("-- removed 'noUploads' item")
}

if (sessionStorage.getItem("nxtpg")) {
	sessionStorage.removeItem("nxtpg");
	console.log("-- removed 'nxtpg' item");
}

if (sessionStorage.getItem("embed")) {
	sessionStorage.removeItem("embed");
	console.log("-- removed 'embed' item");
}

if (sessionStorage.getItem("audioUrl")) {
	sessionStorage.removeItem("audioUrl");
	console.log("-- removed 'audioUrl' item");
}

if (sessionStorage.getItem("goToFirst")) {
	sessionStorage.removeItem("goToFirst");
	console.log("-- removed 'goToFirst' item");
}

if (sessionStorage.getItem("ratio")) {
	sessionStorage.removeItem("ratio");
	console.log("-- removed 'ratio' item");
}

if (sessionStorage.getItem("total")) {
	sessionStorage.removeItem("total");
	console.log("-- removed 'ratio' item");
}

console.log("- checking and setting localStorage items")

if (!localStorage.getItem("disableCards")) {
	localStorage.setItem("disableCards", "n");
	document.getElementById("disableCards").value = "n";
} else {
	if (localStorage.getItem("disableCards") == "y") {
		document.getElementById("disableCards").value = "y";
		document.getElementById("cardsContainer").style.display = "none";
	} else {
		document.getElementById("disableCards").value = "n";
	}
}

if (!localStorage.getItem("invIns")) {
	localStorage.setItem("invIns", "o");
	document.getElementById("invIns").value = "o";
} else {
	if (localStorage.getItem("invIns") == "yew") {
		localStorage.setItem("invIns", "o");
		console.log("-- reset invidious instance setting!")
		document.getElementById("invIns").value = localStorage.getItem("invIns");
	} else {
		document.getElementById("invIns").value = localStorage.getItem("invIns");
	}
}

if (!localStorage.getItem("homePage")) {
	localStorage.setItem("homePage", "inv");
	document.getElementById("home").value = "inv";
} else {
	document.getElementById("home").value = localStorage.getItem("homePage");
}

if (!localStorage.getItem("country")) {
	localStorage.setItem("country", "us");
	document.getElementById("country").value = "us";
} else {
	document.getElementById("country").value = localStorage.getItem("country");
}

if (localStorage.getItem("trendCont")) {
	localStorage.setItem("country", localStorage.getItem("trendCont"));
	localStorage.removeItem("trendCont");
}

if (!localStorage.getItem("sLoc")) {
	document.getElementById("server").value = "a";
	localStorage.setItem("sLoc", "a");
} else {
	document.getElementById("server").value = localStorage.getItem("sLoc");
}

if (!localStorage.getItem("injectRedir")) {
	document.getElementById("injectRedir").value = "y";
	localStorage.setItem("injectRedir", "y");
} else {
	document.getElementById("injectRedir").value = localStorage.getItem("injectRedir");
}

if (!localStorage.getItem("loadComm")) {
	localStorage.setItem("loadComm", "y");
	document.getElementById("autoComm").value = "y";
} else {
	document.getElementById("autoComm").value = localStorage.getItem("loadComm");
}

if (!localStorage.getItem("autoplay")) {
	localStorage.setItem("autoplay" , "y");
	document.getElementById('apSwitch').checked = true;
} else {
	if (localStorage.getItem("autoplay") == "y") {
		document.getElementById("apSwitch").checked = true;
	} else {
		document.getElementById("apSwitch").checked = false;
	}
}

if (!localStorage.getItem("pbSpeed")) {
	localStorage.setItem("pbSpeed" , "1x");
	document.getElementById("speed").value = "1x";
} else {
	document.getElementById("speed").value = localStorage.getItem("pbSpeed");
	setSpeed();
}

if (!localStorage.getItem("suggest")) {
	localStorage.setItem("suggest" , "y");
	document.getElementById("suggest").value = "y"
} else {
	document.getElementById("suggest").value = localStorage.getItem("suggest");
}

if (!localStorage.getItem("theme")) {
	localStorage.setItem("theme" , "d_v1");
	document.getElementById("wTheme").value = "d_v1";
} else {
	if (localStorage.getItem("theme") == "w") {
		localStorage.setItem("theme" , "w_v1");
	} else if (localStorage.getItem("theme") == "d") {
		localStorage.setItem("theme" , "d_v1");
	}
	document.getElementById("wTheme").value = localStorage.getItem("theme");
}

if (!localStorage.getItem("smart")) {
	localStorage.setItem("smart" , "y");
	document.getElementById("sq").value = "y";
} else {
	document.getElementById("sq").value = localStorage.getItem("smart");
}

if (!localStorage.getItem("sqFail")) {
	localStorage.setItem("sqFail" , "dg");
	document.getElementById("sqFailure").value = "dg";
} else {
	document.getElementById("sqFailure").value = localStorage.getItem("sqFail");
}


if (!localStorage.getItem("showReddit")) {
	localStorage.setItem("showReddit" , "n");
	document.getElementById("showReddit").value = "n";
} else {
	document.getElementById("showReddit").value = localStorage.getItem("showReddit");
}

if (!localStorage.getItem("showSize")) {
	localStorage.setItem("showSize" , "n");
	document.getElementById("showSize").value = "n";
} else {
	document.getElementById("showSize").value = localStorage.getItem("showSize");
}

if (!localStorage.getItem("skipSponsors")) {
	localStorage.setItem("skipSponsors","n");
	document.getElementById("skipSponsors").value = "n";
} else {
	document.getElementById("skipSponsors").value = localStorage.getItem("skipSponsors");
}

if (!localStorage.getItem("supportHDR")) {
	localStorage.setItem("supportHDR","n");
	document.getElementById("hdrSupport").value = "n";
} else {
	document.getElementById("hdrSupport").value = localStorage.getItem("supportHDR");
}

if (!localStorage.getItem("allowAutoScale")) {
	localStorage.setItem("allowAutoScale" , "y");
	document.getElementById("aas").value = "y";
} else {
	document.getElementById("aas").value = localStorage.getItem("allowAutoScale");
	if (localStorage.getItem("mScale")) {
		document.getElementById("mScale").value = localStorage.getItem("mScale");
	} 
}

if (!localStorage.getItem("theatre")) {
	localStorage.setItem("theatre" , "n");
} else {
	if (localStorage.getItem("theatre") == 'n') {
		// do nothing
	} else {
		theatre();
	}
}

console.log("ended onload functions");
console.log("==================");

// end setting checkers
// listeners

document.addEventListener('keydown', function (event) {
    if (event.defaultPrevented) {
        return;
    }

    var key = event.key || event.keyCode;

	if (document.activeElement.tagName == "INPUT") {
		if (key == 'Enter' | key == 13) {
			getSLink();
		}
		return;
	} else {
		if (key == 'j' || key == 'J' || key == 74) {
			document.getElementById("player").currentTime = document.getElementById("player").currentTime - 10;
			if (localStorage.getItem('smart') == 'y') {
				document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
			}
		} else if (key == 'k' || key == 'K' || key == 75) {
			if (!document.getElementById("embedContainer").style.display == "" && document.getElementById("vidViewer").style.display == "") {
				if (!document.getElementById("player").paused) {
					document.getElementById('player').pause();
				} else {
					document.getElementById('player').play();
				}
			}
		} else if (key == 'l' || key == 'L' || key == 76) {
			document.getElementById("player").currentTime = document.getElementById("player").currentTime + 10;
			if (localStorage.getItem('smart') == 'y') {
				document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
			}
		} else if (key == 't' || key == 'T' || key == 84) {
			if (document.getElementById("vidPage").style.display == "") {
				if (document.getElementById("embedContainer").style.display == "") {
					theatre("embed");
				} else {
					theatre();
				}
			}
		} else if (key == 'f' || key == 'F' || key == 70) {
			if (!document.getElementById("vidPage").style.display == "") {
				var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
					(document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
					(document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
					(document.msFullscreenElement && document.msFullscreenElement !== null);
				if (!isInFullScreen) {
					if (document.getElementById("player").requestFullscreen) {
						document.getElementById("player").requestFullscreen();
					} else if (document.getElementById("player").mozRequestFullScreen) {
						document.getElementById("player").mozRequestFullScreen();
					} else if (document.getElementById("player").webkitRequestFullScreen) {
						document.getElementById("player").webkitRequestFullScreen();
					} else if (document.getElementById("player").msRequestFullscreen) {
						document.getElementById("player").msRequestFullscreen();
					}
				} else {
					if (document.exitFullscreen) {
						document.exitFullscreen();
					} else if (document.webkitExitFullscreen) {
						document.webkitExitFullscreen();
					} else if (document.mozCancelFullScreen) {
						document.mozCancelFullScreen();
					} else if (document.msExitFullscreen) {
						document.msExitFullscreen();
					}
				}
			}
		} else if (key == "<" || key == 188) {
			var speed = document.getElementById("speed").value;
			if (speed == "25x") {
				document.getElementById("speed").value = "p1x";
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
			} else if (speed == "5x") {
				document.getElementById("speed").value = "25x";
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
				setSpeed();
			} else if (speed == "75x") {
				document.getElementById("speed").value = "5x";
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
				setSpeed();
			} else if (speed == "1x") {
				document.getElementById("speed").value = "75x";
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
				setSpeed();
			} else if (speed == "125x") {
				document.getElementById("speed").value = "1x";
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
				setSpeed();
			} else if (speed == "15x") {
				document.getElementById("speed").value = "125x";
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
				setSpeed();
			} else if (speed == "175x") {
				document.getElementById("speed").value = "15x";
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
				setSpeed();
			} else if (speed == "2x") {
				document.getElementById("speed").value = "175x";
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
				setSpeed();
			} else if (speed == "225x") {
				document.getElementById("speed").value = "2x";
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
				setSpeed();
			} else if (speed == "2p5x") {
				document.getElementById("speed").value = "225x";
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
				setSpeed();
			} else if (speed == "275x") {
				document.getElementById("speed").value = "2p5x";
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
				setSpeed();
			} else if (speed == "3x") {
				document.getElementById("speed").value = "275x";
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
				setSpeed();
			}
		} else if (key == ">" || key == 190) {
			var speed = document.getElementById("speed").value;
			if (speed == "3x") {
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
			} else if (speed == "275x") {
				document.getElementById("speed").value = "3x";
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
			} else if (speed == "2p5x") {
				document.getElementById("speed").value = "275x";
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
			} else if (speed == "225x") {
				document.getElementById("speed").value = "2p5x";
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
			} else if (speed == "2x") {
				document.getElementById("speed").value = "225x";
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
			} else if (speed == "175x") {
				document.getElementById("speed").value = "2x";
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
				setSpeed();
			} else if (speed == "15x") {
				document.getElementById("speed").value = "175x";
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
				setSpeed();
			} else if (speed == "125x") {
				document.getElementById("speed").value = "15x";
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
				setSpeed();
			} else if (speed == "1x") {
				document.getElementById("speed").value = "125x";
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
				setSpeed();
			} else if (speed == "75x") {
				document.getElementById("speed").value = "1x";
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
				setSpeed();
			} else if (speed == "5x") {
				document.getElementById("speed").value = "75x";
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
				setSpeed();
			} else if (speed == "25x") {
				document.getElementById("speed").value = "5x";
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
				setSpeed();
			} else if (speed == "p1x") {
				document.getElementById("speed").value = "25x";
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
				setSpeed();
			}
		} else if (key == "m" || key == "M" || key == 77) {
			if (localStorage.getItem("smart") == "n") {
				if (document.getElementById("player").muted == true) {
					document.getElementById("player").muted = false;
				} else {
					document.getElementById("player").muted = true;
				}
			} else {
				if (document.getElementById("audioPlayer").muted == true) {
					document.getElementById("audioPlayer").muted = false;
				} else {
					document.getElementById("audioPlayer").muted = true;
				}
			}
		} else if (key == "0" | key == 48) {
			if (document.getElementById("playerContainer").style.display == "") {
				document.getElementById("player").currentTime = 0;
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
			}
		} else if (key == "1" | key == 49) {
			if (document.getElementById("playerContainer").style.display == "") {
				var d = (document.getElementById("player").duration / 10);
				document.getElementById("player").currentTime = d;
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
			}
		} else if (key == "2" | key == 50) {
			if (document.getElementById("playerContainer").style.display == "") {
				var d = (document.getElementById("player").duration / 10) * 2;
				document.getElementById("player").currentTime = d;
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
			}
		} else if (key == "3" | key == 51) {
			if (document.getElementById("playerContainer").style.display == "") {
				var d = (document.getElementById("player").duration / 10) * 3;
				document.getElementById("player").currentTime = d;
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
			}
		} else if (key == "4" | key == 52) {
			if (document.getElementById("playerContainer").style.display == "") {
				var d = (document.getElementById("player").duration / 10) * 4;
				document.getElementById("player").currentTime = d;
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
			}
		} else if (key == "5" | key == 53) {
			if (document.getElementById("playerContainer").style.display == "") {
				var d = (document.getElementById("player").duration / 10) * 5;
				document.getElementById("player").currentTime = d;
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
			}
		} else if (key == "6" | key == 54) {
			if (document.getElementById("playerContainer").style.display == "") {
				var d = (document.getElementById("player").duration / 10) * 6;
				document.getElementById("player").currentTime = d;
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
			}
		} else if (key == "7" | key == 55) {
			if (document.getElementById("playerContainer").style.display == "") {
				var d = (document.getElementById("player").duration / 10) * 7;
				document.getElementById("player").currentTime = d;
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
			}
		} else if (key == "8" | key == 56) {
			if (document.getElementById("playerContainer").style.display == "") {
				var d = (document.getElementById("player").duration / 10) * 8;
				document.getElementById("player").currentTime = d;
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
			}
		} else if (key == "9" | key == 57) {
			var d = (document.getElementById("player").duration / 10) * 9;
			document.getElementById("player").currentTime = d;
			if (localStorage.getItem("smart") == "y") { 
				document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
			}
		}
	}
});

document.getElementById("player").onerror = function(e){
	sessionStorage.setItem("ewv", "y");
	if (!sessionStorage.getItem("ewa")) {
		openVideo(localStorage.getItem("sLoc"), "y");
	} else {
		document.getElementById("loadErr").style.display = "";
		return;
	}
};

document.getElementById("audioPlayer").onerror = function(e){
	sessionStorage.setItem("ewa", "y");
	if (!sessionStorage.getItem("ewv")) {
		openVideo(localStorage.getItem("sLoc"), "y");
	} else {
		document.getElementById("loadErr").style.display = "";
		return;
	}
};

var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutationRecord) {
        if (document.getElementById("loadErr").style.display == "") {
			document.getElementById("player").style.display = "none";
		} else {
			document.getElementById("player").style.display = "";
		}
    });    
});
var target = document.getElementById('loadErr');
observer.observe(target, { attributes : true, attributeFilter : ['style'] });

console.log("autoplay: " + localStorage.getItem('autoplay'));
console.log("smartQual: " + localStorage.getItem('smart'));
console.log("server: " + localStorage.getItem('sLoc'));

// end onload functions

function resize(actType, size) {
	if (document.getElementById("theme").href.includes("mobile.css")) {
		document.getElementById("player").style = "";
	}
	if (localStorage.getItem("allowAutoScale") == "y" && actType == "auto") {
		var w = window.innerWidth;
		if (!localStorage.getItem("theme") | localStorage.getItem("theme") == "d_v1") {
			if (!localStorage.getItem("theme")) {
				localStorage.setItem("theme" , "d_v1");
			}
			if (w < 1200) {
				document.getElementById("theme").href = "css/dark/mobile.css";
				document.getElementById("mScale").value = "m";
				if (localStorage.getItem("theater") == "n") {
					theatre();
				}
			} else if (w < 1430) {
				document.getElementById("theme").href = "css/dark/smaller.css";
				document.getElementById("mScale").value = "s";
			} else {
				document.getElementById("theme").href = "css/dark/style.css";
				document.getElementById("mScale").value = "f";
			}
		} else if (localStorage.getItem("theme") == "w_v1") {
			if (w < 1200) {
				document.getElementById("theme").href = "css/white/mobile.css";
				document.getElementById("mScale").value = "m";
				if (localStorage.getItem("theater") == "n") {
					theatre();
				}
			} else if (w < 1430) {
				document.getElementById("theme").href = "css/white/smaller.css";
				document.getElementById("mScale").value = "s";
			} else {
				document.getElementById("theme").href = "css/white/style.css";
				document.getElementById("mScale").value = "f";
			}
		} else if (localStorage.getItem("theme") == "b_v1") {
			if (w < 1200) {
				document.getElementById("theme").href = "css/black/mobile.css";
				if (localStorage.getItem("theater") == "n") {
					theatre();
				}
				document.getElementById("mScale").value = "m";
			} else if (w < 1430) {
				document.getElementById("theme").href = "css/black/smaller.css";
				document.getElementById("mScale").value = "s";
			} else {
				document.getElementById("theme").href = "css/black/style.css";
				document.getElementById("mScale").value = "f";
			}
		} else if (localStorage.getItem("theme") == "m_v1") {
			if (w < 1200) {
				document.getElementById("theme").href = "css/maroon/mobile.css";
				if (localStorage.getItem("theater") == "n") {
					theatre();
				}
				document.getElementById("mScale").value = "m";
			} else if (w < 1430) {
				document.getElementById("theme").href = "css/maroon/smaller.css";
				document.getElementById("mScale").value = "s";
			} else {
				document.getElementById("theme").href = "css/maroon/style.css";
				document.getElementById("mScale").value = "f";
			}
		} else if (localStorage.getItem("theme") == "v_v1") {
			if (w < 1200) {
				document.getElementById("theme").href = "css/velvet/mobile.css";
				if (localStorage.getItem("theater") == "n") {
					theatre();
				}
				document.getElementById("mScale").value = "m";
			} else if (w < 1430) {
				document.getElementById("theme").href = "css/velvet/smaller.css";
				document.getElementById("mScale").value = "s";
			} else {
				document.getElementById("theme").href = "css/velvet/style.css";
				document.getElementById("mScale").value = "f";
			}
		}
	} else if (actType == "manual" && localStorage.getItem("allowAutoScale") == "n" | actType == "auto" && localStorage.getItem("allowAutoScale") == "n") {
		if (!localStorage.getItem("theme") | localStorage.getItem("theme") == "d_v1") {
			if (!localStorage.getItem("theme")) {
				localStorage.setItem("theme" , "d_v1");
			}
			if (size == "m") {
				document.getElementById("theme").href = "css/dark/mobile.css";
				if (localStorage.getItem("theater") == "n") {
					theatre();
				}
				document.getElementById("mScale").value = "m";
			} else if (size == "s") {
				document.getElementById("theme").href = "css/dark/smaller.css";
				document.getElementById("mScale").value = "s";
			} else {
				document.getElementById("theme").href = "css/dark/style.css";
				document.getElementById("mScale").value = "f";
			}
		} else if (localStorage.getItem("theme") == "w_v1") {
			if (size == "m") {
				document.getElementById("theme").href = "css/white/mobile.css";
				if (localStorage.getItem("theater") == "n") {
					theatre();
				}
				document.getElementById("mScale").value = "m";
			} else if (size == "s") {
				document.getElementById("theme").href = "css/white/smaller.css";
				document.getElementById("mScale").value = "s";
			} else {
				document.getElementById("theme").href = "css/white/style.css";
				document.getElementById("mScale").value = "f";
			}
		} else if (localStorage.getItem("theme") == "b_v1") {
			if (size == "m") {
				document.getElementById("theme").href = "css/black/mobile.css";
				if (localStorage.getItem("theater") == "n") {
					theatre();
				}
				document.getElementById("mScale").value = "m";
			} else if (size == "s") {
				document.getElementById("theme").href = "css/black/smaller.css";
				document.getElementById("mScale").value = "s";
			} else {
				document.getElementById("theme").href = "css/black/style.css";
				document.getElementById("mScale").value = "f";
			}
		} else if (localStorage.getItem("theme") == "m_v1") {
			if (size == "m") {
				document.getElementById("theme").href = "css/maroon/mobile.css";
				if (localStorage.getItem("theater") == "n") {
					theatre();
				}
				document.getElementById("mScale").value = "m";
			} else if (size == "s") {
				document.getElementById("theme").href = "css/maroon/smaller.css";
				document.getElementById("mScale").value = "s";
			} else {
				document.getElementById("theme").href = "css/maroon/style.css";
				document.getElementById("mScale").value = "f";
			}
		} else if (localStorage.getItem("theme") == "v_v1") {
			if (size == "m") {
				document.getElementById("theme").href = "css/velvet/mobile.css";
				if (localStorage.getItem("theater") == "n") {
					theatre();
				}
				document.getElementById("mScale").value = "m";
			} else if (size == "s") {
				document.getElementById("theme").href = "css/velvet/smaller.css";
				document.getElementById("mScale").value = "s";
			} else {
				document.getElementById("theme").href = "css/velvet/style.css";
				document.getElementById("mScale").value = "f";
			}
		}
	}
}

function getSLink() {
	window.open("#s#" + encodeURIComponent(document.getElementById("q").value), "_self")
}

function search(opt) {
	document.title = "vidpolaris";
	var q = getClickedId(window.location.href, "#s#");
	document.title = "search results for " + decodeURIComponent(q) + " | vidpolaris";
	document.getElementById("searchPage").style.display = '';
	document.getElementById("seaLoader").style.display = '';
	document.getElementById("helpOut").style.display = '';
	document.getElementById("resultsContainer").style.display = 'none';
	document.getElementById("playlistPage").style.display = 'none';
	document.getElementById("vidPage").style.display = 'none';
	document.getElementById("channelPage").style.display = 'none';
	document.getElementById("searchContainer").style.display = 'none';
	document.getElementById("homePage").style.display = 'none';
	document.getElementById("settingsPage").style.display = 'none';
	document.getElementById("searchTerm").style.display = "none";
	document.getElementById("player").pause();
	document.getElementById("bannerPfpContainer").style.display = 'none';
	const http = new XMLHttpRequest();
	if (document.getElementById("sType").value == "all") {
		if (opt == "a" | !opt) {
			var url = "https://vidpolaris.ml:9019/?search=" + q;
		} else if (opt == "b"){
			var url = "https://vidpolaris.herokuapp.com/?search=" + q;
		} else if (opt == "c") {
			var url = "https://vidpolaris-europe.herokuapp.com/?search=" + q;
		}
	} else {
		if (opt == "a" | !opt) {
			var url = "https://vidpolaris.ml:9019/?search=" + q + "&type=" + document.getElementById("sType").value;
		} else if (opt == "b"){
			var url = "https://vidpolaris.herokuapp.com/?search=" + q + "&type=" + document.getElementById("sType").value;
		} else if (opt == "c") {
			var url = "https://vidpolaris-europe.herokuapp.com/?search=" + q + "&type=" + document.getElementById("sType").value;
		}
	}
	http.open("GET", url);
	http.send();
	http.onload=(e)=>{
		var jsond = JSON.parse(http.responseText);
		document.getElementById("searchQuery").innerHTML = decodeURIComponent(q);
		document.getElementById("searchTerm").style.display = "";
		if (!jsond.searchResults) {
			document.getElementById("errorPage").style.display = '';
			document.getElementById("errorTxt").innerHTML = "no results were found."
			document.getElementById("vidPage").style.display = 'none';
			document.getElementById("nsWarnPage").style.display = 'none';
			document.getElementById("settingsPage").style.display = 'none';
			document.getElementById("errorPage").style.display = 'none';
			document.getElementById("searchPage").style.display = 'none';
			document.getElementById("homePage").style.display = 'none';
			document.getElementById("bannerPfpContainer").style.display = 'none';
			return;
		}
		document.getElementById("resultsContainer").innerHTML = "";
		for (var c in jsond.searchResults.items) {
			if (jsond.searchResults.items[c].type == "video") {
				var link = document.createElement("A");
				link.href = "#w#" + jsond.searchResults.items[c].link.substring(32);
				link.id = "re" + c;
				document.getElementById("resultsContainer").appendChild(link); 
				var div = document.createElement("DIV");
				div.classList.add("resultVideo");
				div.id = "re" + c + "Div";
				document.getElementById("re"+c).appendChild(div);
				var thumb = document.createElement("IMG");
				thumb.src = "https://img.youtube.com/vi/" + jsond.searchResults.items[c].link.substring(32) + "/hqdefault.jpg";
				thumb.classList.add("smallThumb");
				document.getElementById("re"+c+"Div").appendChild(thumb);
				var div2 = document.createElement("DIV");
				div2.classList.add("resultD");
				div2.id = "re" + c + "Info";
				document.getElementById("re"+c+"Div").appendChild(div2);
				var title = document.createElement("H2");
				title.innerHTML = jsond.searchResults.items[c].title;
				title.classList.add("stat");
				document.getElementById("re"+c+"Info").appendChild(title);
				var author = document.createElement("H3");
				author.innerHTML = '<span class="material-icons ico">person</span> ' + jsond.searchResults.items[c].author.name;
				author.classList.add("stat");
				document.getElementById("re"+c+"Info").appendChild(author);
				var stat1 = document.createElement("H3");
				if (jsond.searchResults.items[c].views == null | !jsond.searchResults.items[c].views) {
					stat1.innerHTML = '<span class="material-icons ico">remove_red_eye</span> [Unobtainable] views';
				} else {
					stat1.innerHTML = '<span class="material-icons ico">remove_red_eye</span> ' + jsond.searchResults.items[c].views.toLocaleString() + ' views';
				}
				stat1.classList.add("stat");
				document.getElementById("re"+c+"Info").appendChild(stat1);
				var stat2 = document.createElement("H3");
				stat2.innerHTML = '<span class="material-icons ico">calendar_today</span> posted ' + jsond.searchResults.items[c].uploaded_at;
				stat2.classList.add("stat");
				document.getElementById("re"+c+"Info").appendChild(stat2);
				var stat3 = document.createElement("H3");
				stat3.innerHTML = '<span class="material-icons ico">timer</span> ' + jsond.searchResults.items[c].duration;
				stat3.classList.add("stat");
				document.getElementById("re"+c+"Info").appendChild(stat3);
				var desc = document.createElement("P");
				desc.innerHTML = jsond.searchResults.items[c].description;
				desc.classList.add("stat");
				document.getElementById("re"+c+"Info").appendChild(desc);
			} else if (jsond.searchResults.items[c].type == "playlist") {
				var link = document.createElement("A");
				link.href = "#p#" + getClickedId(jsond.searchResults.items[c].link, "?list=");
				link.id = "re" + c
				document.getElementById("resultsContainer").appendChild(link);
				var div = document.createElement("DIV");
				div.classList.add("resultVideo");
				div.id = "re" + c + "Div"
				document.getElementById("re"+c).appendChild(div);
				var thumb = document.createElement("IMG");
				thumb.src = jsond.searchResults.items[c].thumbnail;
				thumb.classList.add("smallThumb");
				document.getElementById("re"+c+"Div").appendChild(thumb);
				var div2 = document.createElement("DIV");
				div2.classList.add("resultD");
				div2.id = "re" + c + "Info";
				document.getElementById("re"+c+"Div").appendChild(div2);
				var title = document.createElement("H2");
				title.innerHTML = jsond.searchResults.items[c].title;
				title.classList.add("stat");
				document.getElementById("re"+c+"Info").appendChild(title);
				var author = document.createElement("H3")
				author.innerHTML = '<span class="material-icons ico">person</span> ' + jsond.searchResults.items[c].author.name;
				author.classList.add("stat");
				document.getElementById("re"+c+"Info").appendChild(author);
				var playLength = document.createElement("H3");
				playLength.innerHTML = '<span class="material-icons ico">playlist_play</span> ' + jsond.searchResults.items[c].length;
				playLength.classList.add("stat")
				document.getElementById("re"+c+"Info").appendChild(playLength);
			} else if (jsond.searchResults.items[c].type == "channel") {
				var link = document.createElement("A");
				link.href = "#c#" + jsond.searchResults.items[c].channel_id;
				link.id = "re" + c
				document.getElementById("resultsContainer").appendChild(link);
				var div = document.createElement("DIV");
				div.classList.add("resultVideo");
				div.id = "re" + c + "Div"
				document.getElementById("re"+c).appendChild(div);
				var thumb = document.createElement("IMG");
				thumb.src = jsond.searchResults.items[c].avatar;
				thumb.classList.add("smallIcon");
				document.getElementById("re"+c+"Div").appendChild(thumb);
				var div2 = document.createElement("DIV");
				div2.classList.add("resultD");
				div2.id = "re" + c + "Info";
				document.getElementById("re"+c+"Div").appendChild(div2);
				var author = document.createElement("H2");
				author.innerHTML = jsond.searchResults.items[c].name;
				author.classList.add("stat");
				document.getElementById("re"+c+"Info").appendChild(author);
				var stat1 = document.createElement("H3");
				stat1.innerHTML = '<span class="material-icons ico">playlist_play</span> ' + jsond.searchResults.items[c].videos.toLocaleString() + ' videos';
				stat1.classList.add("stat");
				document.getElementById("re"+c+"Info").appendChild(stat1);
				var desc = document.createElement("P");
				desc.innerHTML = jsond.searchResults.items[c].description_short;
				desc.classList.add("stat");
				document.getElementById("re"+c+"Info").appendChild(desc);
			} else if (jsond.searchResults.items[c].type == "shelf-vertical") {
				var mDiv = document.createElement("DIV");
				mDiv.classList.add("verticalShelf");
				mDiv.id = "re" + c + "Div";
				document.getElementById("resultsContainer").appendChild(mDiv);
				var shelfTitle = document.createElement("H3");
				shelfTitle.classList.add("stat");
				shelfTitle.innerHTML = jsond.searchResults.items[c].title;
				document.getElementById("re"+c+"Div").appendChild(shelfTitle);
				for (var cc in jsond.searchResults.items[c].items) {
					var link = document.createElement("A");
					link.href = "#w#" + jsond.searchResults.items[c].items[cc].link.substring(32);
					link.id = c + "sub" + cc + "Link";
					document.getElementById("re"+c+"Div").appendChild(link); 
					var div = document.createElement("DIV");
					div.classList.add("sResultVideo");
					div.id = c + "sub" + cc + "Div";
					document.getElementById(c+"sub"+cc+"Link").appendChild(div);
					var thumb = document.createElement("IMG");
					thumb.src = "https://img.youtube.com/vi/" + jsond.searchResults.items[c].items[cc].link.substring(32) + "/hqdefault.jpg";
					thumb.classList.add("smallThumb");
					document.getElementById(c+"sub"+cc+"Div").appendChild(thumb);
					var div2 = document.createElement("DIV");
					div2.classList.add("resultD");
					div2.id = c + "sub" + cc + "Info";
					document.getElementById(c+"sub"+cc+"Div").appendChild(div2);
					var title = document.createElement("H2");
					title.innerHTML = jsond.searchResults.items[c].items[cc].title;
					title.classList.add("stat");
					document.getElementById(c+"sub"+cc+"Info").appendChild(title);
					var author = document.createElement("H3");
					author.innerHTML = '<span class="material-icons ico">person</span> ' + jsond.searchResults.items[c].items[cc].author.name;
					author.classList.add("stat");
					document.getElementById(c+"sub"+cc+"Info").appendChild(author);
					var stat1 = document.createElement("H3");
					if (jsond.searchResults.items[c].items[cc].views == null | !jsond.searchResults.items[c].items[cc].views) {
						stat1.innerHTML = '<span class="material-icons ico">remove_red_eye</span> [Unobtainable] views';
					} else {
						stat1.innerHTML = '<span class="material-icons ico">remove_red_eye</span> ' + jsond.searchResults.items[c].items[cc].views.toLocaleString() + ' views';
					}
					stat1.classList.add("stat");
					document.getElementById(c+"sub"+cc+"Info").appendChild(stat1);
					var stat2 = document.createElement("H3");
					stat2.innerHTML = '<span class="material-icons ico">calendar_today</span> posted ' + jsond.searchResults.items[c].items[cc].uploaded_at;
					stat2.classList.add("stat");
					document.getElementById(c+"sub"+cc+"Info").appendChild(stat2);
					var stat3 = document.createElement("H3");
					stat3.innerHTML = '<span class="material-icons ico">timer</span> ' + jsond.searchResults.items[c].items[cc].duration;
					stat3.classList.add("stat");
					document.getElementById(c+"sub"+cc+"Info").appendChild(stat3);
					var desc = document.createElement("P");
					desc.innerHTML = jsond.searchResults.items[c].items[cc].description;
					desc.classList.add("stat");
					document.getElementById(c+"sub"+cc+"Info").appendChild(desc);
				}
			} else {
				
			}
		}
		document.getElementById("seaLoader").style.display = 'none';
		document.getElementById("resultsContainer").style.display = '';
		document.getElementById("searchContainer").style.display = '';
	}
}

function feelingLucky(opt) {
	document.getElementById("homePage").style.display = 'none';
	document.getElementById("searchContainer").style.display = 'none';
	document.getElementById("vidPage").style.display = '';
	document.getElementById("vidLoader").style.display = '';
	const http = new XMLHttpRequest();
	if (!document.getElementById("q").value == "") {
		var q = document.getElementById("q").value;
		if (opt == "a" | !opt) {
			var url = "https://vidpolaris.ml:9019/?search=" + encodeURIComponent(q);
		} else if (opt == "b") {
			var url = "https://vidpolaris.herokuapp.com/?search=" + encodeURIComponent(q);
		} else if (opt == "c") {
			var url = "https://vidpolaris-europe.herokuapp.com/?search=" + encodeURIComponent(q);
		}
		http.open("GET", url);
		http.send();
		http.onload=(e)=>{
			var jsond = JSON.parse(http.responseText);
			if (!jsond) {
				home();
				return;
			}
			var wLink = jsond.searchResults.items[0].link;
			var link2 = wLink.substring(32);
			window.open("#w#" + link2, "_self");
		}
	} else {
		var randomLetter = [
			"a",
			"b",
			"c",
			"d",
			"e",
			"f",
			"g",
			"h",
			"i",
			"j",
			"k",
			"l",
			"m",
			"n",
			"o",
			"p",
			"q",
			"r",
			"s",
			"t",
			"u",
			"v",
			"w",
			"x",
			"y",
			"z"
		]
		var qLetter = randomLetter[Math.floor(Math.random()*randomLetter.length)];
		console.log(qLetter)
		if (opt == "a" | !opt) {
			var surl = "https://vidpolaris.ml:9019/?suggest=" + qLetter;
		} else if (opt == "b") {
			var surl = "https://vidpolaris.herokuapp.com/?suggest=" + qLetter;
		} else if (opt == "c") {
			var surl = "https://vidpolaris-europe.herokuapp.com/?suggest=" + qLetter;
		}
		console.log(surl)
		http.open("GET",surl);
		http.send();
		http.onload=(e)=>{
			var json = JSON.parse(http.responseText);
			var res = json.results;
			var q = res[Math.floor(Math.random()*res.length)];
			if (opt == "a" | !opt) {
				var url = "https://vidpolaris.ml:9019/?search=" + encodeURIComponent(q);
			} else if (opt == "b") {
				var url = "https://vidpolaris.herokuapp.com/?search=" + encodeURIComponent(q);
			} else if (opt == "c") {
				var url = "https://vidpolaris-europe.herokuapp.com/?search=" + encodeURIComponent(q);
			}
			http.open("GET", url);
			http.send();
			http.onload=(e)=>{
				var jsond = JSON.parse(http.responseText);
				if (!jsond) {
					home();
					return;
				}
				var wLink = jsond.searchResults.items[0].link;
				var link2 = wLink.substring(32);
				if (jsond.searchResults.items[0].type == "video") {
					window.open("#w#" + link2, "_self");
				} else if (jsond.searchResults.items[0].type == "channel") {
					window.open("#c#" + link2, "_self");
				} else {
					notPlayable();
				}
			}
		}
	}
}

function getTrending(opt,inst) {
	const http = new XMLHttpRequest();
	if (!inst | inst == "o") {
		if (opt == "a" | !opt) {
			var url = "https://vidpolaris.ml:9019/?trending=" + localStorage.getItem("country")
		} else if (opt == "b") {
			var url = "https://vidpolaris.herokuapp.com/?trending=" + localStorage.getItem("country");
		} else if (opt == "c") {
			var url = "https://vidpolaris-europe.herokuapp.com/?trending=" + localStorage.getItem("country");
		}
	} else {
		if (opt == "a" | !opt) {
			var url = "https://vidpolaris.ml:9019/?trending=" + localStorage.getItem("country") + "&inst=" + inst
		} else if (opt == "b") {
			var url = "https://vidpolaris.herokuapp.com/?trending=" + localStorage.getItem("country") + "&inst=" + inst;
		} else if (opt == "c") {
			var url = "https://vidpolaris-europe.herokuapp.com/?trending=" + localStorage.getItem("country") + "&inst=" + inst;
		}
	}
	http.open("GET", url);
	http.send();
	http.onload=(e)=>{
		var jsond = JSON.parse(http.responseText);
		if (!jsond[0]) {
			redditTrending(opt);
			document.getElementById("fallbacktoRed").style.display = "";
			return;
		}
		for (var c in jsond) {
			if (c > 17) {
				document.getElementById("trendingLoader").style.display = 'none';
				document.getElementById("trending").style.display = '';
				document.getElementById("mainTrending").style.display = '';
				document.getElementById("redditTrending").style.display = 'none';
				if (!inst) {
					getTrendingMusic(opt);
				} else {
					getTrendingMusic(opt,inst);
				}
				return;
			}
			var link = document.createElement("A");
			link.href = "#w#" + jsond[c].videoId;
			link.id = "l" + c;
			document.getElementById("mainTrending").appendChild(link);
			var div = document.createElement("DIV");
			div.classList.add("video");
			div.id = "div" + c;
			document.getElementById("l"+c).appendChild(div);
			var img = document.createElement("IMG");
			img.classList.add("largeThumb");
			img.src = "https://img.youtube.com/vi/" + jsond[c].videoId + "/hqdefault.jpg";
			document.getElementById("div"+c).appendChild(img);
			var div2 = document.createElement("DIV");
			div2.classList.add("td");
			div2.id = "tdDiv"+c;
			document.getElementById("div"+c).appendChild(div2);
			var h3 = document.createElement("H3");
			h3.classList.add("stat");
			h3.innerHTML = jsond[c].title;
			document.getElementById("tdDiv"+c).appendChild(h3);
			var stat1 = document.createElement("H4");
			stat1.innerHTML = 'by ' + jsond[c].author;
			stat1.classList.add("stat")
			document.getElementById("tdDiv"+c).appendChild(stat1);
			var stat2 = document.createElement("H4");
			stat2.innerHTML = 'posted ' + jsond[c].publishedText;
			stat2.classList.add("stat");
			document.getElementById("tdDiv"+c).appendChild(stat2);
		}
	}
	http.onerror = function (error) {
		redditTrending(opt);
		document.getElementById("fallbacktoRed").style.display = "";
		return;
	}
}

function getTrendingMusic(opt, inst) {
	const http = new XMLHttpRequest();
	if (!inst | inst == "o") {
		if (opt == "a" | !opt) {
			var url = "https://vidpolaris.ml:9019/?trending=" + localStorage.getItem("country") + "&type=music";
		} else if (opt == "b") {
			var url = "https://vidpolaris.herokuapp.com/?trending=" + localStorage.getItem("country") + "&type=music";
		} else if (opt == "c") {
			var url = "https://vidpolaris-europe.herokuapp.com/?trending=" + localStorage.getItem("country") + "&type=music";
		}
	} else {
		if (opt == "a" | !opt) {
			var url = "https://vidpolaris.ml:9019/?trending=" + localStorage.getItem("country") + "&type=music&inst=" + inst;
		} else if (opt == "b") {
			var url = "https://vidpolaris.herokuapp.com/?trending=" + localStorage.getItem("country") + "&type=music&inst=" + inst;
		} else if (opt == "c") {
			var url = "https://vidpolaris-europe.herokuapp.com/?trending=" + localStorage.getItem("country") + "&type=music&inst=" + inst;
		}
	}
	http.open("GET", url);
	http.send();
	http.onload=(e)=>{
		var jsond = JSON.parse(http.responseText);
		if (!jsond[0]) {
			redditTrending(opt);
			document.getElementById("fallbacktoRed").style.display = "";
			return;
		}
		for (var c in jsond) {
			if (c > 11) {
				document.getElementById("musicTrending").style.display = '';
				if (!inst) {
					getTrendingGaming(opt);
				} else {
					getTrendingGaming(opt, inst);
				}
				return;
			}
			var link = document.createElement("A");
			link.href = "#w#" + jsond[c].videoId;
			link.id = "ml" + c;
			document.getElementById("musicTrending").appendChild(link);
			var div = document.createElement("DIV");
			div.classList.add("video");
			div.id = "mDiv" + c;
			document.getElementById("ml"+c).appendChild(div);
			var img = document.createElement("IMG");
			img.classList.add("largeThumb");
			img.src = "https://img.youtube.com/vi/" + jsond[c].videoId + "/hqdefault.jpg";
			document.getElementById("mDiv"+c).appendChild(img);
			var div2 = document.createElement("DIV");
			div2.classList.add("td");
			div2.id = "mtdDiv"+c;
			document.getElementById("mDiv"+c).appendChild(div2);
			var h3 = document.createElement("H3");
			h3.classList.add("stat");
			h3.innerHTML = jsond[c].title;
			document.getElementById("mtdDiv"+c).appendChild(h3);
			var stat1 = document.createElement("H4");
			stat1.innerHTML = 'by ' + jsond[c].author;
			stat1.classList.add("stat")
			document.getElementById("mtdDiv"+c).appendChild(stat1);
			var stat2 = document.createElement("H4");
			stat2.innerHTML = 'posted ' + jsond[c].publishedText;
			stat2.classList.add("stat");
			document.getElementById("mtdDiv"+c).appendChild(stat2);
		}
	}
}

function getTrendingGaming(opt,inst) {
	const http = new XMLHttpRequest();
	if (!inst | inst == "o") {
		if (opt == "a" | !opt) {
			var url = "https://vidpolaris.ml:9019/?trending=" + localStorage.getItem("country") + "&type=gaming";
		} else if (opt == "b") {
			var url = "https://vidpolaris.herokuapp.com/?trending=" + localStorage.getItem("country") + "&type=gaming";
		} else if (opt == "c") {
			var url = "https://vidpolaris-europe.herokuapp.com/?trending=" + localStorage.getItem("country") + "&type=gaming";
		}
	} else {
		if (opt == "a" | !opt) {
			var url = "https://vidpolaris.ml:9019/?trending=" + localStorage.getItem("country") + "&type=gaming&inst=" + inst;
		} else if (opt == "b") {
			var url = "https://vidpolaris.herokuapp.com/?trending=" + localStorage.getItem("country") + "&type=gaming&inst=" + inst;
		} else if (opt == "c") {
			var url = "https://vidpolaris-europe.herokuapp.com/?trending=" + localStorage.getItem("country") + "&type=gaming&inst=" + inst;
		}
	}
	http.open("GET", url);
	http.send();
	http.onload=(e)=>{
		var jsond = JSON.parse(http.responseText);
		if (!jsond[0]) {
			redditTrending(opt);
			document.getElementById("fallbacktoRed").style.display = "";
			return;
		}
		for (var c in jsond) {
			if (c > 11) {
				document.getElementById("gamingTrending").style.display = '';
				return;
			}
			var link = document.createElement("A");
			link.href = "#w#" + jsond[c].videoId;
			link.id = "gl" + c;
			document.getElementById("gamingTrending").appendChild(link);
			var div = document.createElement("DIV");
			div.classList.add("video");
			div.id = "gDiv" + c;
			document.getElementById("gl"+c).appendChild(div);
			var img = document.createElement("IMG");
			img.classList.add("largeThumb");
			img.src = "https://img.youtube.com/vi/" + jsond[c].videoId + "/hqdefault.jpg";
			document.getElementById("gDiv"+c).appendChild(img);
			var div2 = document.createElement("DIV");
			div2.classList.add("td");
			div2.id = "gtdDiv"+c;
			document.getElementById("gDiv"+c).appendChild(div2);
			var h3 = document.createElement("H3");
			h3.classList.add("stat");
			h3.innerHTML = jsond[c].title;
			document.getElementById("gtdDiv"+c).appendChild(h3);
			var stat1 = document.createElement("H4");
			stat1.innerHTML = 'by ' + jsond[c].author;
			stat1.classList.add("stat")
			document.getElementById("gtdDiv"+c).appendChild(stat1);
			var stat2 = document.createElement("H4");
			stat2.innerHTML = 'posted ' + jsond[c].publishedText;
			stat2.classList.add("stat");
			document.getElementById("gtdDiv"+c).appendChild(stat2);
		}
	}
}

function redditTrending(opt) {
	const http = new XMLHttpRequest();
	if (opt == "a" | !opt) {
		var url = "https://vidpolaris.ml:9019/?reddit=1";
	} else if (opt == "b") {
		var url = "https://vidpolaris.herokuapp.com/?reddit=1";
	} else if (opt == "c") {
		var url = "https://vidpolaris-europe.herokuapp.com/?reddit=1";
	}
	http.open("GET", url);
	http.send();
	http.onload=(e)=>{
		var jsond = JSON.parse(http.responseText);
		if (!jsond[0] && !jsond.err) {
			getTrending(opt,localStorage.getItem("invIns"));
			document.getElementById("fallbacktoInv").style.display = "none";
			return;
		}
		if (jsond.err) {
			getTrending(opt,localStorage.getItem("invIns"));
			document.getElementById("fallbacktoInv").style.display = "none";
			return;
		}
		for (var c in jsond) {
			if (c > 17) {
				document.getElementById("redditTrending").style.display = "";
				document.getElementById("redTrending").style.display = "";
				document.getElementById("mainTrending").style.display = "none";
				document.getElementById("trendingLoader").style.display = "none";
				redditmusicTrending(opt)
				return;
			} 
			var link = document.createElement("A");
			link.href = "#w#" + jsond[c].id;
			var div = document.createElement("DIV");
			div.classList.add("video");
			link.appendChild(div);
			var img = document.createElement("IMG");
			img.classList.add("largeThumb");
			img.src = "https://img.youtube.com/vi/" + jsond[c].id + "/hqdefault.jpg";
			div.appendChild(img);
			var div2 = document.createElement("DIV");
			div2.classList.add("td");
			div.appendChild(div2);
			var h3 = document.createElement("H3");
			h3.classList.add("stat");
			h3.innerHTML = jsond[c].title;
			div2.appendChild(h3);
			var stat1 = document.createElement("H4");
			stat1.innerHTML = 'by ' + jsond[c].author;
			stat1.classList.add("stat")
			div2.appendChild(stat1);
			var stat2 = document.createElement("H4");
			stat2.innerHTML = jsond[c].score.toLocaleString() + ' upvotes';
			stat2.classList.add("stat");
			div2.appendChild(stat2);
			document.getElementById("redTrending").appendChild(link);
		}
	}
}

function redditmusicTrending(opt) {
	const http = new XMLHttpRequest();
	if (opt == "a" | !opt) {
		var url = "https://vidpolaris.ml:9019/?reddit=1&type=music";
	} else if (opt == "b") {
		var url = "https://vidpolaris.herokuapp.com/?reddit=1&type=music";
	} else if (opt == "c") {
		var url = "https://vidpolaris-europe.herokuapp.com/?reddit=1&type=music";
	}
	http.open("GET", url);
	http.send();
	http.onload=(e)=>{
		var jsond = JSON.parse(http.responseText);
		if (!jsond[0]) {
			getTrending(opt,localStorage.getItem("invIns"));
			document.getElementById("fallbacktoInv").style.display = "none";
			return;
		}
		if (jsond.err) {
			getTrending(opt,localStorage.getItem("invIns"));
			document.getElementById("fallbacktoInv").style.display = "none";
			return;
		}
		for (var c in jsond) {
			if (c > 17) {
				document.getElementById("redmuTrending").style.display = "";
				redditdeepTrending(opt);
				return;
			} 
			var link = document.createElement("A");
			link.href = "#w#" + jsond[c].id;
			var div = document.createElement("DIV");
			div.classList.add("video");
			link.appendChild(div);
			var img = document.createElement("IMG");
			img.classList.add("largeThumb");
			img.src = "https://img.youtube.com/vi/" + jsond[c].id + "/hqdefault.jpg";
			div.appendChild(img);
			var div2 = document.createElement("DIV");
			div2.classList.add("td");
			div.appendChild(div2);
			var h3 = document.createElement("H3");
			h3.classList.add("stat");
			h3.innerHTML = jsond[c].title;
			div2.appendChild(h3);
			var stat1 = document.createElement("H4");
			stat1.innerHTML = 'by ' + jsond[c].author;
			stat1.classList.add("stat")
			div2.appendChild(stat1);
			var stat2 = document.createElement("H4");
			stat2.innerHTML = jsond[c].score.toLocaleString() + ' upvotes';
			stat2.classList.add("stat");
			div2.appendChild(stat2);
			document.getElementById("redmuTrending").appendChild(link);
		}
	}
}

function redditdeepTrending(opt) {
	const http = new XMLHttpRequest();
	if (opt == "a" | !opt) {
		var url = "https://vidpolaris.ml:9019/?reddit=1&type=deep";
	} else if (opt == "b") {
		var url = "https://vidpolaris.herokuapp.com/?reddit=1&type=deep";
	} else if (opt == "c") {
		var url = "https://vidpolaris-europe.herokuapp.com/?reddit=1&type=deep";
	}
	http.open("GET", url);
	http.send();
	http.onload=(e)=>{
		var jsond = JSON.parse(http.responseText);
		if (!jsond[0]) {
			getTrending(opt,localStorage.getItem("invIns"));
			document.getElementById("fallbacktoInv").style.display = "none";
			return;
		}
		if (jsond.err) {
			getTrending(opt,localStorage.getItem("invIns"));
			document.getElementById("fallbacktoInv").style.display = "none";
			return;
		}
		for (var c in jsond) {
			if (c > 17) {
				document.getElementById("redobTrending").style.display = "";
				return;
			} 
			var link = document.createElement("A");
			link.href = "#w#" + jsond[c].id;
			var div = document.createElement("DIV");
			div.classList.add("video");
			link.appendChild(div);
			var img = document.createElement("IMG");
			img.classList.add("largeThumb");
			img.src = "https://img.youtube.com/vi/" + jsond[c].id + "/hqdefault.jpg";
			div.appendChild(img);
			var div2 = document.createElement("DIV");
			div2.classList.add("td");
			div.appendChild(div2);
			var h3 = document.createElement("H3");
			h3.classList.add("stat");
			h3.innerHTML = jsond[c].title;
			div2.appendChild(h3);
			var stat1 = document.createElement("H4");
			stat1.innerHTML = 'by ' + jsond[c].author;
			stat1.classList.add("stat")
			div2.appendChild(stat1);
			var stat2 = document.createElement("H4");
			stat2.innerHTML = jsond[c].score.toLocaleString() + ' upvotes';
			stat2.classList.add("stat");
			div2.appendChild(stat2);
			document.getElementById("redobTrending").appendChild(link);
		}
	}
}

function openVideo(opt,ret) {
	setTimeout(function () {
		if (!window.location.href.includes("#w#")) {
			return;
		} else {
			if (!ret) {
				document.getElementById("vidLoaderTxt").innerHTML = "getting ready...";
				if (!sessionStorage.getItem("currentlyOpening")) {
					document.title = "[loading...] vidpolaris";
					document.getElementById("player").pause();
					document.getElementById("homePage").style.display = 'none';
					document.getElementById("searchContainer").style.display = 'none';
					document.getElementById("searchPage").style.display = 'none';
					document.getElementById("settingsPage").style.display = 'none';
					document.getElementById("searchTerm").style.display = "none";
					document.getElementById("channelPage").style.display = 'none';
					document.getElementById("errorPage").style.display = 'none';
					document.getElementById("loadErr").style.display = 'none';
					document.getElementById("embedContainer").style.display = "none";
					document.getElementById("vidAuthor").style.display = 'none';
					document.getElementById("vidViews").style.display = 'none';
					document.getElementById("refreshBtn").style.display = 'none';
					document.getElementById("vidRatings").style.display = 'none';
					document.getElementById("theat_embed").style.display = 'none';
					document.getElementById("playlistPage").style.display = 'none';
					document.getElementById("vidViewer").style.display = 'none';
					document.getElementById("sharDiv").style.display = 'none';
					document.getElementById("aqOptions").style.display = '';
					document.getElementById("vidPage").style.display = '';
					document.getElementById("helpOut").style.display = '';
					document.getElementById("qSelector").style.display = '';
					document.getElementById("speedSelector").style.display = '';
					document.getElementById("theat_native").style.display = '';
					document.getElementById("embedPlayer").style.display = '';
					document.getElementById("vidLoader").style.display = '';
					document.getElementById("playerContainer").style.display = '';
					document.getElementById("lpSwitch").checked = false;
					document.getElementById("embedContainer").innerHTML = '';
					document.getElementById("relatedVideos").innerHTML = '';
					document.getElementById("moreVideos").innerHTML = '';
					document.getElementById("player").removeAttribute("loop");
					sessionStorage.removeItem("tried2");
					sessionStorage.removeItem("ewv");
					sessionStorage.removeItem("ewa");
					sessionStorage.removeItem("ratio");
					sessionStorage.removeItem("total");
					sessionStorage.removeItem("embed");
					sessionStorage.setItem("currentlyOpening", "y");
					document.getElementById("qOptions").innerHTML = "";
					document.getElementById("aqOptions").innerHTML = "";
					if (document.getElementById("ldBtn").innerHTML == "see less") {
						document.getElementById("ldBtn").click();
					}
					document.getElementById("vidLoaderTxt").innerHTML = "parsing url...";
					var id = getClickedId(window.location.href, '#w#');
					var fullUrl = "https://youtube.com/watch?v=" + id;
					const http = new XMLHttpRequest();
					if (opt == "a" | !opt) {
						var url = "https://vidpolaris.ml:9019/?info=1&url=" + fullUrl;
					} else if (opt == "b"){
						var url = "https://vidpolaris.herokuapp.com/?info=1&url=" + fullUrl;
					} else if (opt == "c") {
						var url = "https://vidpolaris-europe.herokuapp.com/?info=1&url=" + fullUrl;
					}
					document.getElementById("vidLoaderTxt").innerHTML = "generating request...";
					http.open("GET", url);
					http.send();
					http.onload=(e)=>{
						var jsond = JSON.parse(http.responseText);
						document.getElementById("vidLoaderTxt").innerHTML = "parsing request...";
						if (jsond.err) {
							notPlayable(jsond.err);
							sessionStorage.removeItem("currentlyOpening");
						} else {
							if (jsond.info.player_response.playabilityStatus.status == "UNPLAYABLE") {
								notPlayable(jsond.info.player_response.playabilityStatus.reason || jsond.info.player_response.playablityStatus.errorScreen.playerErrorMessageRenderer.reason.runs[0].text);
								sessionStorage.removeItem("currentlyOpening");
								return;
							} else if (jsond.info.playerResponse.playabilityStatus.status == "UNPLAYABLE") {
								notPlayable(jsond.info.player_response.playabilityStatus.errorScreen.playerErrorMessageRenderer.subreason.runs[0].text || jsond.info.player_response.playabilityStatus.reason);
								sessionStorage.removeItem("currentlyOpening");
								return;
							}
							document.getElementById("vidLoaderTxt").innerHTML = "defining basic video information...";
							var wUrl = jsond.info.formats[0].url;
							var titl = jsond.info.player_response.videoDetails.title;
							var auth = jsond.info.player_response.videoDetails.author;
							var aLink = "#c#" + jsond.info.author.id;
							document.getElementById("vidAuthor").style.display = "";
							if (!aLink && !aLink == null && !aLink == undefined) {
								// do nothing
							} else {
								document.getElementById("authorL").href = aLink;
							}
							if (jsond.description) {
								var desc = jsond.description;
							} else if (jsond.info.playerResponse) {
								var desc = jsond.info.playerResponse.videoDetails.shortDescription.replace(/\n/g, "<br>");
							} else if (jsond.info.player_response) {
								var desc = jsond.info.player_response.videoDetails.shortDescription.replace(/\n/g, "<br>");
							} else {
								var desc = "";
							}
							if (desc.length > 300) {
								var shortDesc = desc.substring(0,300) + "..."
								document.getElementById("desc").innerHTML = varLinks(shortDesc);
								document.getElementById("longDesc").innerHTML = varLinks(desc);
								document.getElementById("ldBtn").style.display = '';
								document.getElementById("ldDiv").style.display = 'none';
							} else {
								document.getElementById("desc").innerHTML = varLinks(desc);
								document.getElementById("ldBtn").style.display = 'none';
								document.getElementById("ldDiv").style.display = 'none';
							}
							if (jsond.info.published == null) {
								document.getElementById("vidDate").style.display = "none";
							} else {
								var pDate = new Date(jsond.info.published);
								var month = pDate.getMonth() + 1;
								if (month == 1) {
									var m = "January";
								} else if (month == 2) {
									var m = "February";
								} else if (month == 3) {
									var m = "March";
								} else if (month == 4) {
									var m = "April";
								} else if (month == 5) {
									var m = "May";
								} else if (month == 6) {
									var m = "June";
								} else if (month == 7) {
									var m = "July";
								} else if (month == 8) {
									var m = "August";
								} else if (month == 9) {
									var m = "September";
								} else if (month == 10) {
									var m = "October";
								} else if (month == 11) {
									var m = "November";
								} else if (month == 12) {
									var m = "December";
								}
								var day = pDate.getDate();
								var year = pDate.getFullYear();
								document.getElementById("vidDate").style.display = "";
							}
							if (jsond.info.age_restricted == true) {
								showWarning();
							}
							document.getElementById("viewNum").innerHTML = parseInt(jsond.info.player_response.videoDetails.viewCount).toLocaleString();
							document.getElementById("vidViews").style.display = "";
							if (jsond.info.player_response.microformat.playerMicroformatRenderer.isUnlisted == false) {
								document.getElementById("ulIco").style.display = "none";
								document.getElementById("title").style = "margin:0;"
							} else {
								document.getElementById("ulIco").style.display = "";
								document.getElementById("title").style = "margin-top:-27px;margin-left:25px;"
							}
							document.getElementById("vidLoaderTxt").innerHTML = "adding cards...";
							if (!jsond.info.player_response.cards | localStorage.getItem("disableCards") == "y") {
								document.getElementById("cardContainer").innerHTML = "";
							} else {
								document.getElementById("cardContainer").innerHTML = "";
								for (var c in jsond.info.player_response.cards.cardCollectionRenderer.cards) {
									var card = document.createElement("H3");
									card.classList.add("stat");
									card.id = "card"+c;
									document.getElementById("cardContainer").appendChild(card);
									var ico = document.createElement("SPAN");
									ico.classList.add("ico");
									ico.classList.add("material-icons");
									ico.innerHTML = "info";
									document.getElementById("card"+c).appendChild(ico);
									if (jsond.info.player_response.cards.cardCollectionRenderer.cards[c].cardRenderer.content.videoInfoCardContentRenderer) {
										var link = document.createElement("A");
										link.href = "#w#" + jsond.info.player_response.cards.cardCollectionRenderer.cards[c].cardRenderer.content.videoInfoCardContentRenderer.action.watchEndpoint.videoId;
										link.id = "cardL" + c;
										link.classList.add("channelLink");
										document.getElementById("card"+c).appendChild(link);
										if (jsond.info.player_response.cards.cardCollectionRenderer.cards[c].cardRenderer.content.videoInfoCardContentRenderer.customMessage) {
											var txt = document.createElement("SPAN");
											txt.innerHTML = " " + jsond.info.player_response.cards.cardCollectionRenderer.cards[c].cardRenderer.content.videoInfoCardContentRenderer.customMessage.simpleText || "[No message]";
											document.getElementById("cardL"+c).appendChild(txt);
										} else {
											var txt = document.createElement("SPAN");
											txt.innerHTML = " " + jsond.info.player_response.cards.cardCollectionRenderer.cards[c].cardRenderer.content.videoInfoCardContentRenderer.videoTitle.simpleText || "[No message]";
											document.getElementById("cardL"+c).appendChild(txt);
										}
									} else if (jsond.info.player_response.cards.cardCollectionRenderer.cards[c].cardRenderer.content.playlistInfoCardContentRenderer) {
										var link = document.createElement("A");
										link.href = "#p#" + jsond.info.player_response.cards.cardCollectionRenderer.cards[c].cardRenderer.content.playlistInfoCardContentRenderer.action.watchEndpoint.playlistId;
										link.id = "cardL" + c;
										link.classList.add("channelLink");
										document.getElementById("card"+c).appendChild(link);
										if (!jsond.info.player_response.cards.cardCollectionRenderer.cards[c].cardRenderer.content.playlistInfoCardContentRenderer.customMessage) {
											var txt = document.createElement("SPAN");
											txt.innerHTML = " " + jsond.info.player_response.cards.cardCollectionRenderer.cards[c].cardRenderer.content.playlistInfoCardContentRenderer.playlistTitle.simpleText || "[No message]";
											document.getElementById("cardL"+c).appendChild(txt);
										} else {
											var txt = document.createElement("SPAN");
											txt.innerHTML = " " + jsond.info.player_response.cards.cardCollectionRenderer.cards[c].cardRenderer.content.playlistInfoCardContentRenderer.customMessage.simpleText || "[No message]";
											document.getElementById("cardL"+c).appendChild(txt);
										}
									} else if (jsond.info.player_response.cards.cardCollectionRenderer.cards[c].cardRenderer.content.collaboratorInfoCardContentRenderer) {
										var link = document.createElement("A");
										link.href = "#c#" + jsond.info.player_response.cards.cardCollectionRenderer.cards[c].cardRenderer.content.collaboratorInfoCardContentRenderer.endpoint.browseEndpoint.browseId;
										link.id = "cardL" + c;
										link.classList.add("channelLink");
										document.getElementById("card"+c).appendChild(link);
										if (jsond.info.player_response.cards.cardCollectionRenderer.cards[c].cardRenderer.teaser.simpleCardTeaserRenderer.message) {
											var txt = document.createElement("SPAN");
											txt.innerHTML = " " + jsond.info.player_response.cards.cardCollectionRenderer.cards[c].cardRenderer.teaser.simpleCardTeaserRenderer.message.simpleText || "[No message]";
											document.getElementById("cardL"+c).appendChild(txt);
										} else {
											var txt = document.createElement("SPAN");
											txt.innerHTML = " [No message]";
											document.getElementById("cardL"+c).appendChild(txt);
										}
									} else if (jsond.info.player_response.cards.cardCollectionRenderer.cards[c].cardRenderer.content.pollRenderer) {
										var q = document.createElement("H4");
										q.classList.add("stat");
										q.innerHTML = jsond.info.player_response.cards.cardCollectionRenderer.cards[c].cardRenderer.content.pollRenderer.question.simpleText;
										q.style = "margin-left:25px;margin-top:-23px;";
										document.getElementById("card"+c).appendChild(q);
										var div = document.createElement("DIV");
										div.classList.add("sResultVideo");
										div.id = "cardPoll"+c;
										document.getElementById("card"+c).appendChild(div)
										for (var cc in jsond.info.player_response.cards.cardCollectionRenderer.cards[c].cardRenderer.content.pollRenderer.choices) {
											var choice = document.createElement("P");
											choice.classList.add("stat");
											choice.innerHTML = jsond.info.player_response.cards.cardCollectionRenderer.cards[c].cardRenderer.content.pollRenderer.choices[cc].text.simpleText + " [" + parseFloat(jsond.info.player_response.cards.cardCollectionRenderer.cards[c].cardRenderer.content.pollRenderer.choices[cc].numVotes).toLocaleString() + " votes]";
											document.getElementById("cardPoll"+c).appendChild(choice);
										}
									} else if (jsond.info.player_response.cards.cardCollectionRenderer.cards[c].cardRenderer.content.simpleCardContentRenderer) {
										var link = document.createElement("A");
										link.href = decodeURIComponent(getClickedId(jsond.info.player_response.cards.cardCollectionRenderer.cards[c].cardRenderer.content.simpleCardContentRenderer.command.urlEndpoint.url, "&q="))
										link.id = "cardL" + c;
										link.classList.add("channelLink");
										document.getElementById("card"+c).appendChild(link);
										var txt = document.createElement("SPAN");
										txt.innerHTML = jsond.info.player_response.cards.cardCollectionRenderer.cards[c].cardRenderer.content.simpleCardContentRenderer.title.simpleText + " [" + jsond.info.player_response.cards.cardCollectionRenderer.cards[c].cardRenderer.content.simpleCardContentRenderer.displayDomain.simpleText + "]";
										document.getElementById("cardL"+c).appendChild(txt);
									}
								}
							}
							document.getElementById("vidLoaderTxt").innerHTML = "defining more things...";
							var cat = jsond.info.media.category;
							if (cat == undefined) {
								document.getElementById("catCont").style.display = "none";
							} else {
								document.getElementById("catCont").style.display = "";
								document.getElementById("cat").innerHTML = cat;
							}
							document.getElementById("vidLoaderTxt").innerHTML = "embedding related videos...";
							if (!jsond.info.related_videos[0]) {
								document.getElementById("relatedVideos").style.display = 'none';
								document.getElementById("autoPlayBlock").style.display = 'none';
							} else {
								document.getElementById("relatedVideos").style.display = '';
								if (jsond.info.related_videos.length > 9) {
									document.getElementById("expandRelated").style.display = '';
								} else {
									document.getElementById("expandRelated").style.display = 'none';
								}
								document.getElementById("autoPlayBlock").style.display = '';
								document.getElementById("moreVideos").style.display = 'none';
								if (jsond.info.related_videos.length / 3) {
									var n = (jsond.info.related_videos.length / 3).toString();
									if (Number.isInteger(n)) {
										document.getElementById("commentsContainer").style.display = "";
										document.getElementById("helpOut").style.display = "";
									} else {
										document.getElementById("commentsContainer").style.display = "none";
										document.getElementById("helpOut").style.display = "none";
									}
								}
								for (var c in jsond.info.related_videos) {
									var l = document.createElement("A");
									l.href = "#w#" + jsond.info.related_videos[c].id;
									var d = document.createElement("DIV");
									d.classList.add("smallVideo")
									var img = document.createElement("IMG");
									img.src = "https://img.youtube.com/vi/" + jsond.info.related_videos[c].id + "/hqdefault.jpg";
									img.classList.add("relatedThumb");
									var h4 = document.createElement("H4");
									h4.classList.add("stat");
									h4.innerHTML = jsond.info.related_videos[c].title;
									var stat1 = document.createElement("H5");
									stat1.classList.add("stat");
									var aIco = document.createElement("SPAN");
									aIco.classList.add("material-icons");
									aIco.classList.add("ico");
									aIco.innerHTML = "person";
									stat1.appendChild(aIco);
									stat1.innerHTML = stat1.innerHTML + " " + jsond.info.related_videos[c].author;
									var stat2 = document.createElement("H5");
									stat2.classList.add("stat");
									var vIco = document.createElement("SPAN");
									vIco.classList.add("material-icons");
									vIco.classList.add("ico");
									vIco.innerHTML = "remove_red_eye";
									stat2.appendChild(vIco);
									stat2.innerHTML = stat2.innerHTML + " " + jsond.info.related_videos[0].short_view_count_text + " views";
									if (c < 9) {
										d.appendChild(img);
										d.appendChild(h4);
										d.appendChild(stat1);
										d.appendChild(stat2);
										l.appendChild(d);
										document.getElementById("relatedVideos").appendChild(l);
									} else {
										d.appendChild(img);
										d.appendChild(h4);
										d.appendChild(stat1);
										d.appendChild(stat2);
										d.classList.add("noCenter");
										l.appendChild(d);
										document.getElementById("moreVideos").appendChild(l);
									}
								}
							}
							document.getElementById("title").innerHTML = titl;
							document.getElementById("author").innerHTML = auth;
							document.getElementById("player").poster = "https://img.youtube.com/vi/" + id + "/hqdefault.jpg";;
							document.getElementById("pubM").innerHTML = m;
							document.getElementById("pubY").innerHTML = year;
							document.getElementById("pubD").innerHTML = day;
							if (!jsond.info.likes) {
								document.getElementById("vidRatings").style.display = "none";
								document.getElementById("subText").style.display = "none";
							} else {
								if (jsond.info.dislikes == null) {
									var dlik = 0;
								} else {
									var dlik = jsond.info.dislikes;
								}
								if (!jsond.info.likes == null) {
									var like = 0;
								} else {
									var like = jsond.info.likes;
								}
								var totl = dlik + like;
								sessionStorage.setItem("total", totl.toLocaleString());
								if (!totl == 0){
									var untRatio = jsond.info.likes / totl;
									var percent = 100 * untRatio;
									if (dlik > like) {
										var ratio = "-" + percent.toPrecision(4);
									} else {
										var ratio = percent.toPrecision(4);
									}
									sessionStorage.setItem("ratio", ratio);
								} else {
									var ratio = 0;
									sessionStorage.setItem("ratio", ratio);
								}
								if (jsond.info.author.subscriber_count) {
									document.getElementById("subText").innerHTML = "[" + jsond.info.author.subscriber_count.toLocaleString() + " subscribers]";
								} else {
									document.getElementById("subText").innerHTML = "";
								}
								document.getElementById("likeNum").innerHTML = like.toLocaleString();
								document.getElementById("dlikNum").innerHTML = dlik.toLocaleString();
								document.getElementById("ldRatio").innerHTML = ratio;
								document.getElementById("vidRatings").style.display = "";
								document.getElementById("subText").style.display = "";
							}
							if (localStorage.getItem("smart") == "y") {
								document.getElementById("vidLoaderTxt").innerHTML = "adding qualities...";
								document.getElementById("qSelector").style.display = '';
								var jsond = JSON.parse(http.responseText);
								if (!jsond.audio[0].isMPDDash == true | !jsond.video[0].isMPDDash == true) {
									for (var c in jsond.video) {
										if (c == 0) {
											var option = document.createElement("OPTION");
											option.value = jsond.video[c].itag;
											if (localStorage.getItem("supportHDR") == "n" | !localStorage.getItem("supportHDR")) {
												if (jsond.video[c].codecs.substring(jsond.video[c].codecs.length - 2,  jsond.video[c].codecs.length) == ".0") {
													console.log("HDR skipped | " + jsond.video[c].codecs);
													sessionStorage.setItem("goToFirst", "y");
													sessionStorage.setItem("audioUrl", jsond.audio[0].url);
												} else if (jsond.video[c].codecs == "vp9.2") {
													console.log("HDR skipped | " + jsond.video[c].codecs);
													sessionStorage.setItem("goToFirst", "y");
													sessionStorage.setItem("audioUrl", jsond.audio[0].url);
												} else {
													if (localStorage.getItem("showSize")) {
														if (localStorage.getItem("showSize") == "y") {
															if (jsond.video[c].contentLength) {
																option.innerHTML = jsond.video[c].qualityLabel + " [" + formatBytes(parseInt(jsond.video[c].contentLength)) + " - " + jsond.video[c].codecs +"]";
															} else {
																option.innerHTML = jsond.video[c].qualityLabel + " [size not avaliable - " + jsond.video[c].codecs + "]";
															}
														} else {
															option.innerHTML = jsond.video[c].qualityLabel + " [" + jsond.video[c].codecs + "]";
														} 
													} else {
														option.innerHTML = jsond.video[c].qualityLabel + " [" + jsond.video[c].codecs + "]";
													}
													document.getElementById("qOptions").appendChild(option);
													document.getElementById("itag").innerHTML = jsond.video[c].itag;
													document.getElementById("player").src = jsond.video[c].url;
													document.getElementById("audioPlayer").src = jsond.audio[0].url;
													document.getElementById("qOptions").value = jsond.video[c].itag;
												}
											} else {
												if (localStorage.getItem("showSize")) {
													if (localStorage.getItem("showSize") == "y") {
														if (jsond.video[c].contentLength) {
															option.innerHTML = jsond.video[c].qualityLabel + " [" + formatBytes(parseInt(jsond.video[c].contentLength)) + " - " + jsond.video[c].codecs +"]";
														} else {
															option.innerHTML = jsond.video[c].qualityLabel + " [size not avaliable - " + jsond.video[c].codecs + "]";
														}
													} else {
														option.innerHTML = jsond.video[c].qualityLabel + " [" + jsond.video[c].codecs + "]";
													} 
												} else {
													option.innerHTML = jsond.video[c].qualityLabel + " [" + jsond.video[c].codecs + "]";
												}
												document.getElementById("qOptions").appendChild(option);
											}
										} else {
											if (jsond.video[c-1].qualityLabel == jsond.video[c].qualityLabel) {
												// do nothing
											} else {
												var option = document.createElement("OPTION");
												option.value = jsond.video[c].itag;
												if (localStorage.getItem("supportHDR") == "n" | !localStorage.getItem("supportHDR")) {
													if (jsond.video[c].codecs.substring(jsond.video[c].codecs.length - 2,  jsond.video[c].codecs.length) == ".0") {
														console.log("HDR skipped | " + jsond.video[c].codecs);
													} else if (jsond.video[c].codecs == "vp9.2") {
														console.log("HDR skipped | " + jsond.video[c].codecs);
													} else {
														if (localStorage.getItem("showSize")) {
															if (localStorage.getItem("showSize") == "y") {
																if (jsond.video[c].contentLength) {
																	option.innerHTML = jsond.video[c].qualityLabel + " [" + formatBytes(parseInt(jsond.video[c].contentLength)) + " - " + jsond.video[c].codecs +"]";
																} else {
																	option.innerHTML = jsond.video[c].qualityLabel + " [size not avaliable - " + jsond.video[c].codecs + "]";
																}
															} else {
																option.innerHTML = jsond.video[c].qualityLabel + " [" + jsond.video[c].codecs + "]";
															} 
														} else {
															option.innerHTML = jsond.video[c].qualityLabel + " [" + jsond.video[c].codecs + "]";
														}
														document.getElementById("qOptions").appendChild(option);
													}
												} else {
													if (localStorage.getItem("showSize")) {
														if (localStorage.getItem("showSize") == "y") {
															if (jsond.video[c].contentLength) {
																option.innerHTML = jsond.video[c].qualityLabel + " [" + formatBytes(parseInt(jsond.video[c].contentLength)) + " - " + jsond.video[c].codecs +"]";
															} else {
																option.innerHTML = jsond.video[c].qualityLabel + " [size not avaliable - " + jsond.video[c].codecs + "]";
															}
														} else {
															option.innerHTML = jsond.video[c].qualityLabel + " [" + jsond.video[c].codecs + "]";
														} 
													} else {
														option.innerHTML = jsond.video[c].qualityLabel + " [" + jsond.video[c].codecs + "]";
													}
													document.getElementById("qOptions").appendChild(option);
												}
											}
										}
									}
									for (var c in jsond.audio) {
										if (c == 0) {
											var option = document.createElement("OPTION");
											option.value = jsond.audio[c].itag;
											if (localStorage.getItem("showSize")) {
												if (localStorage.getItem("showSize") == "y") {
													if (jsond.audio[c].contentLength) {
														option.innerHTML = jsond.audio[c].audioBitrate + "kbps" + " [" + formatBytes(parseInt(jsond.audio[c].contentLength)) + " - " + jsond.audio[c].codecs + "]";
													} else {
														option.innerHTML = jsond.audio[c].audioBitrate + "kbps [size not avaliable - " + jsond.audio[c].codecs + "]";
													}
												} else {
													option.innerHTML = jsond.audio[c].audioBitrate + "kbps [" + jsond.audio[c].codecs + "]";
												} 
											} else {
												option.innerHTML = jsond.audio[c].audioBitrate + "kbps [" + jsond.audio[c].codecs + "]";
											}
											document.getElementById("aqOptions").appendChild(option);
										} else {
											if (jsond.audio[c-1].audioBitrate == jsond.audio[c].audioBitrate) {
												// do nothing
											} else {
												var option = document.createElement("OPTION");
												option.value = jsond.audio[c].itag;
												if (localStorage.getItem("showSize")) {
													if (localStorage.getItem("showSize") == "y") {
														if (jsond.audio[c].contentLength) {
															option.innerHTML = jsond.audio[c].audioBitrate + "kbps" + " [" + formatBytes(parseInt(jsond.audio[c].contentLength)) + " - " + jsond.audio[c].codecs + "]";
														} else {
															option.innerHTML = jsond.audio[c].audioBitrate + "kbps [size not avaliable - " + jsond.audio[c].codecs + "]";
														}
													} else {
														option.innerHTML = jsond.audio[c].audioBitrate + "kbps [" + jsond.audio[c].codecs + "]";
													} 
												} else {
													option.innerHTML = jsond.audio[c].audioBitrate + "kbps [" + jsond.audio[c].codecs + "]";
												}
													document.getElementById("aqOptions").appendChild(option);
												}
											}
									}
									document.getElementById("aqOptions").style.display = "";
								} else {
									openVideo(opt, "y");
									return;
								}
								document.getElementById("qOptions").value = document.getElementById("itag").innerHTML;
								document.getElementById("title").innerHTML = titl;
								document.title = titl +  " | vidpolaris";
								if (localStorage.getItem("smart") == "y") {
									if (sessionStorage.getItem("goToFirst")) {
										sessionStorage.removeItem("goToFirst");
										document.getElementById("qOptions").value = document.getElementById("qOptions").options[0].value;
										if (opt == "a" | !opt) {
											var url = "https://vidpolaris.ml:9019/?itag=" + document.getElementById("qOptions").options[0].value + "&url=" + fullUrl;
										} else if (opt == "b"){
											var url = "https://vidpolaris.herokuapp.com/?itag=" + document.getElementById("qOptions").options[0].value + "&url=" + fullUrl;
										} else if (opt == "c") {
											var url = "https://vidpolaris-europe.herokuapp.com/?itag=" + document.getElementById("qOptions").options[0].value + "&url=" + fullUrl;
										}
										http.open("GET", url)
										http.send();
										http.onload=(e)=>{
											var jsond = JSON.parse(http.responseText);
											document.getElementById("player").src = jsond.datainfo.url;
											document.getElementById("audioPlayer").src = sessionStorage.getItem("audioUrl");
											sessionStorage.removeItem("audioUrl");
											document.getElementById("vidLoader").style.display = 'none';
											document.getElementById("vidViewer").style.display = '';
											sync();
											document.getElementById("player").load();
											document.getElementById("audioPlayer").load();
											if (localStorage.getItem("loadComm") == "y") {
												getComments("none", opt);
												sessionStorage.removeItem("currentlyOpening");
											} else {
												document.getElementById("loadC").style.display = '';
												document.getElementById("loadedC").style.display = 'none';
												document.getElementById("loadedComments").style.display = 'none';
												document.getElementById("loadinC").style.display = 'none';
												document.getElementById("errorC").style.display = 'none';
												sessionStorage.removeItem("currentlyOpening");
											}
											setSpeed();
											rSearch(opt);
											skipSponsors(opt);
											document.getElementById("player").play();
											document.getElementById("searchContainer").style.display = "";
											return;
										}
									} else {
										document.getElementById("vidLoader").style.display = 'none';
										document.getElementById("vidViewer").style.display = '';
										sync();
										document.getElementById("player").load();
										document.getElementById("audioPlayer").load();
										if (localStorage.getItem("loadComm") == "y") {
											getComments("none", opt);
											sessionStorage.removeItem("currentlyOpening");
										} else {
											document.getElementById("loadC").style.display = '';
											document.getElementById("loadedC").style.display = 'none';
											document.getElementById("loadedComments").style.display = 'none';
											document.getElementById("loadinC").style.display = 'none';
											document.getElementById("errorC").style.display = 'none';
											sessionStorage.removeItem("currentlyOpening");
										}
										setSpeed();
										rSearch(opt);
										skipSponsors(opt);
										document.getElementById("player").play();
										document.getElementById("searchContainer").style.display = "";
										document.getElementById("searchContainer").style.display = "";
									}
								}
							} else {
								document.getElementById("vidViewer").style.display = '';
								document.getElementById("vidLoader").style.display = 'none';
								document.getElementById("player").src = wUrl;
								for (var c in jsond.joined) {
									var option = document.createElement("OPTION")
									if (localStorage.getItem("showSize")) {
										if (localStorage.getItem("showSize") == "y") {
											if (jsond.joined[c].contentLength) {
												option.innerHTML = jsond.joined[c].qualityLabel + " (video) - " + jsond.joined[c].audioBitrate + "kbps (audio) [" + formatBytes(parseInt(jsond.joined[c].contentLength)) + "]";
											} else {
												option.innerHTML = jsond.joined[c].qualityLabel + " (video) - " + jsond.joined[c].audioBitrate + "kbps (audio) [size not avaliable]";
											}
										} else {
											option.innerHTML = jsond.joined[c].qualityLabel + " (video) - " + jsond.joined[c].audioBitrate + "kbps (audio)";
										} 
									} else {
										option.innerHTML = jsond.joined[c].qualityLabel + " (video) - " + jsond.joined[c].audioBitrate + "kbps (audio)";
									}
									document.getElementById("qOptions").appendChild(option);
								}
								document.getElementById("aqOptions").style.display = "none";
								document.title = titl +  " | vidpolaris";
								document.getElementById("player").play();
								document.getElementById("searchContainer").style.display = '';
								sessionStorage.removeItem("currentlyOpening");
								if (localStorage.getItem("loadComm") == "y") {
									getComments("none", opt);
								} else {
									document.getElementById("loadC").style.display = '';
									document.getElementById("loadedC").style.display = 'none';
									document.getElementById("loadedComments").style.display = 'none';
									document.getElementById("loadinC").style.display = 'none';
									document.getElementById("errorC").style.display = 'none';
								}
								setSpeed();
								rSearch(opt);
								skipSponsors(opt);
							}
						}
					}
				}
			} else {
				if (!sessionStorage.getItem("tried2")) {
					document.getElementById("loadErr").style.display = "";
					document.getElementById("playerContainer").style.display = "none";
				} else {
					return;
				}
				if (localStorage.getItem("smart") == "y") {
					const http = new XMLHttpRequest();
					var fullUrl = "https://www.youtube.com/watch?v=" + getClickedId(window.location.href, "#w#");
					if (!opt | opt == "a") {
						var url = "https://vidpolaris.ml:9019/?url=" + fullUrl;
					} else if (opt == "b") {
						var url = "https://vidpolaris.herokuapp.com/?url=" + fullUrl;
					} else  if (opt == "c") {
						var url = "https://vidpolaris-europe.herokuapp.com/?url=" + fullUrl;
					}
					http.open("GET", url);
					http.send();
					http.timeout = 7000;
					http.ontimeout = () => {
						if (opt == "a" | !opt) {
							openVideo("b");
						} else if (opt == "b"){
							openVideo("c");
						} else if (opt == "c") {
							openVideo("a");
						}
					}
					http.onload=(e)=>{
						var jsond = JSON.parse(http.responseText);
						document.getElementById("playerContainer").style.display = "";
						document.getElementById("aqOptions").style.display = "none";
						document.getElementById("qOptions").innerHTML = ""
						for (var c in jsond.datainfo) {
							var option = document.createElement("OPTION");
							if (localStorage.getItem("showSize")) {
								if (localStorage.getItem("showSize") == "y") {
									if (jsond.datainfo[c].contentLength) {
										option.innerHTML = jsond.datainfo[c].qualityLabel + " (video) - " + jsond.datainfo[c].audioBitrate + "kbps (audio) [" + formatBytes(parseInt(jsond.datainfo[c].contentLength)) + "]";
									} else {
										option.innerHTML = jsond.datainfo[c].qualityLabel + " (video) - " + jsond.datainfo[c].audioBitrate + "kbps (audio) [size not avaliable]";	
									}
								} else {
									option.innerHTML = jsond.datainfo[c].qualityLabel + " (video) - " + jsond.datainfo[c].audioBitrate + "kbps (audio)";
								} 
							} else {
								option.innerHTML = jsond.datainfo[c].qualityLabel + " (video) - " + jsond.datainfo[c].audioBitrate + "kbps (audio)";
							}
							option.value = jsond.datainfo[c].itag;
							document.getElementById("qOptions").appendChild(option)
						}
						document.getElementById("player").src = jsond.datainfo[0].url;
						document.getElementById("player").play();
						document.getElementById("vidViewer").style.display = "";
						document.getElementById("searchContainer").style.display = "";
						document.getElementById("vidLoader").style.display = "none";
						document.getElementById("loadErr").style.display = "none";
						if (document.getElementById("vidLoaderTxt").innerHTML.includes("improper")) {
							if (localStorage.getItem("loadComm") == "y") {
								getComments("none", opt);
							} else {
								document.getElementById("loadC").style.display = '';
								document.getElementById("loadedC").style.display = 'none';
								document.getElementById("loadedComments").style.display = 'none';
								document.getElementById("loadinC").style.display = 'none';
								document.getElementById("errorC").style.display = 'none';
							}
							setSpeed();
							if (localStorage.getItem("showReddit") == "y") {
								rSearch(localStorage.getItem("sLoc"));
							}
							sessionStorage.removeItem("currentlyOpening");
							document.title = document.getElementById("title").innerHTML + " | vidpolaris";
							document.getElementById("audioPlayer").src = "";
							setSpeed();
							rSearch(opt);
							skipSponsors(opt);
						}
						sessionStorage.setItem("tried2", "y");
					}
					http.timeout = 7000;
					http.ontimeout = () => {
						if (opt == "a" | !opt) {
							openVideo("b");
						} else if (opt == "b"){
							openVideo("c");
						} else if (opt == "c") {
							openVideo("a");
						}
					}
					http.onerror = function (error) {
						if (opt == "a" | !opt) {
							openVideo("b");
						} else if (opt == "b"){
							openVideo("c");
						} else if (opt == "c") {
							openVideo("a");
						}
					}
				} else {
					const http = new XMLHttpRequest();
					var fullUrl = "https://www.youtube.com/watch?v=" + getClickedId(window.location.href, "#w#");
					if (!opt | opt == "a") {
						var url = "https://vidpolaris.ml:9019/?info=1&url=" + fullUrl;
					} else if (opt == "b") {
						var url = "https://vidpolaris.herokuapp.com/?info=1&url=" + fullUrl;
					} else  if (opt == "c") {
						var url = "https://vidpolaris-europe.herokuapp.com/?info=1&url=" + fullUrl;
					}
					http.open("GET", url);
					http.send();
					http.onload=(e)=>{
						var jsond = JSON.parse(http.responseText);
						if (!jsond.audio) {
							openVideo(opt);
							return;
						}
						var audioUrl = jsond.audio[0].url;
						document.getElementById("audioPlayer").src = audioUrl;
						var videoUrl = jsond.video[0].url;
						document.getElementById("itag").innerHTML = jsond.video[0].itag;
						for (var c in jsond.video) {
							if (c == 0) {
								var option = document.createElement("OPTION");
								option.value = jsond.video[c].itag;
								if (localStorage.getItem("showSize")) {
									if (localStorage.getItem("showSize") == "y" | !jsond.video[c].contentLength) {
										option.innerHTML = jsond.video[c].qualityLabel + " [" + formatBytes(parseInt(jsond.video[c].contentLength)) + "]";
									} else {
										option.innerHTML = jsond.video[c].qualityLabel;
									} 
								} else {
									option.innerHTML = jsond.video[c].qualityLabel;
								}
								document.getElementById("qOptions").appendChild(option);
							} else {
								if (jsond.video[c-1].qualityLabel == jsond.video[c].qualityLabel) {
									// do nothing
								} else {
									var option = document.createElement("OPTION");
									option.value = jsond.video[c].itag;
									if (localStorage.getItem("showSize")) {
										if (localStorage.getItem("showSize") == "y" | !jsond.video[c].contentLength) {
											option.innerHTML = jsond.video[c].qualityLabel + " [" + formatBytes(parseInt(jsond.video[c].contentLength)) + "]";
										} else {
											option.innerHTML = jsond.video[c].qualityLabel;
										} 
									} else {
										option.innerHTML = jsond.video[c].qualityLabel;
									}
									document.getElementById("qOptions").appendChild(option);
								}
							}
						}
						for (var c in jsond.audio) {
							if (c == 0) {
								var option = document.createElement("OPTION");
								option.value = jsond.audio[c].itag;
								if (localStorage.getItem("showSize")) {
									if (localStorage.getItem("showSize") == "y" | !jsond.audio[c].contentLength) {
										option.innerHTML = jsond.audio[c].audioBitrate + "kbps" + " [" + formatBytes(parseInt(jsond.audio[c].contentLength)) + "]";
									} else {
										option.innerHTML = jsond.audio[c].audioBitrate + "kbps";
									} 
								} else {
									option.innerHTML = jsond.audio[c].audioBitrate + "kbps";
								}
								document.getElementById("aqOptions").appendChild(option);
							} else {
								if (jsond.audio[c-1].audioBitrate == jsond.audio[c].audioBitrate) {
									// do nothing
								} else {
									var option = document.createElement("OPTION");
									option.value = jsond.audio[c].itag;
									if (localStorage.getItem("showSize")) {
										if (localStorage.getItem("showSize") == "y" | !jsond.audio[c].contentLength) {
											option.innerHTML = jsond.audio[c].audioBitrate + "kbps" + " [" + formatBytes(parseInt(jsond.audio[c].contentLength)) + "]";
										} else {
											option.innerHTML = jsond.audio[c].audioBitrate + "kbps";
										} 
									} else {
										option.innerHTML = jsond.audio[c].audioBitrate + "kbps";
									}
									document.getElementById("aqOptions").appendChild(option);
								}
							}
						}
						document.getElementById("player").src = videoUrl;
						document.getElementById("player").play();
						document.getElementById("playerContainer").style.display = "";
						document.getElementById("qOptions").value = document.getElementById("itag").innerHTML;
						document.getElementById("qOptions").style.display = "";
						document.getElementById("loadErr").style.display = "none";
						sessionStorage.setItem("tried2", "y");
						setSpeed();
						rSearch(opt);
						skipSponsors(opt);
					}
				}
			}
		}
	}, 10)
}

function getClickedId(parentString, substring) {
    return parentString.substring(parentString.indexOf(substring) + substring.length)
}

function home() {
	document.getElementById("player").pause();
	document.title = "vidpolaris"
	document.getElementById("vidViewer").style.display = 'none';
	document.getElementById("vidPage").style.display = 'none';
	document.getElementById("searchPage").style.display = 'none';
	document.getElementById("channelPage").style.display = 'none';
	document.getElementById("nsWarnPage").style.display = 'none';
	document.getElementById("errorPage").style.display = 'none';
	document.getElementById("homePage").style.display = '';
	document.getElementById("channelPage").style.display = 'none';
	document.getElementById("searchContainer").style.display = '';
	document.getElementById("settingsPage").style.display = 'none';
	document.getElementById("helpOut").style.display = 'none';
	document.getElementById("bannerPfpContainer").style.display = 'none';
	document.getElementById("playlistPage").style.display = 'none';
	document.getElementById("mainTrending").innerHTML = "";
	document.getElementById("redTrending").innerHTML = "";
	document.getElementById("musicTrending").innerHTML = "";
	document.getElementById("gamingTrending").innerHTML = "";
	document.getElementById("embedContainer").innerHTML = "";
	document.getElementById("trendingLoader").style.display = "";
	document.getElementById("trending").style.display = "none";
	document.getElementById("redditTrending").style.display = "none";
	if (!localStorage.getItem("homePage") | localStorage.getItem("homePage") == "inv") {
		if (localStorage.getItem("sLoc")) {
			if (localStorage.getItem("invIns")) {
				getTrending(localStorage.getItem("sLoc"), localStorage.getItem("invIns"))
			} else {
				getTrending(localStorage.getItem("sLoc"));
			}
		} else {
			getTrending()
		}
	} else {
		if (localStorage.getItem("sLoc")) {
			redditTrending(localStorage.getItem("sLoc"));
		} else {
			redditTrending();
		}
	}
}

function longDesc() {
	if (document.getElementById("ldDiv").style.display == 'none') {
		document.getElementById("ldDiv").style.display = 'block';
		document.getElementById("desc").style.display = 'none';
		document.getElementById("ldBtn").innerHTML = "see less";
	} else {
		document.getElementById("ldDiv").style.display = 'none';
		document.getElementById("desc").style.display = '';
		document.getElementById("ldBtn").innerHTML = "see more";
	}
}

function share() {
	if (!document.getElementById("sharDiv").style.display == "") {
		document.getElementById("sharDiv").style.display = '';
		const http = new XMLHttpRequest();
		var id = getClickedId(window.location.href, "#w#");
		var fullUrl = window.location.href;
		document.getElementById("fUrlShar").value = fullUrl;
		document.getElementById("youtubeLink").value = "https://youtube.com/watch?v=" + id;
		document.getElementById("sUrlShar").value = "[Loading...]";
		http.open("POST", "https://rel.ink/api/links/");
		var params = JSON.stringify({
			"url": fullUrl
		})
		http.setRequestHeader('Content-Type', 'application/json')
		http.send(params);
		http.onload=(e)=>{
			var jsond = JSON.parse(http.responseText);
			var shorter = "https://rel.ink/" + jsond.hashid;
			if (jsond.hashid) {
				document.getElementById("sUrlShar").value = shorter;
			} else {
				document.getElementById("sUrlShar").value = "[error]";
			}
		}
	} else {
		document.getElementById("sharDiv").style.display = 'none';
	}
}

function refresh() {
	sessionStorage.removeItem("currentlyRunningT");
	if (window.location.href.includes("#w#")) {
		var id = getClickedId(window.location.href, "#w#")
		if (!id) {
			home();
			return;
		} else {
			if (id.length == 11) {
				openVideo(localStorage.getItem("sLoc"));
			} else {
				notPlayable();
			}
		}
	} else if (window.location.href.includes("#s#")) {
		var q = getClickedId(window.location.href, "#s#");
		if (!document.getElementById("q").value == q) {
			document.getElementById("q").value = q;
			search(localStorage.getItem("sLoc"));
		} else {
			search(localStorage.getItem("sLoc"));
		}
	} else if (window.location.href.includes("#settings")) {
		document.getElementById("player").pause();
		document.getElementById("homePage").style.display = 'none';
		document.getElementById("vidPage").style.display = 'none';
		document.getElementById("channelPage").style.display = 'none';
		document.getElementById("playlistPage").style.display = 'none';
		document.getElementById("errorPage").style.display = 'none';
		document.getElementById("searchPage").style.display = 'none';
		document.getElementById("settingsPage").style.display = '';
		document.getElementById("searchContainer").style.display = '';
		document.getElementById("helpOut").style.display = '';
		if (window.location.href.split("/#")[0].includes("vidpolaris.ml")) {
			document.getElementById("userscriptLink").href = "https://greasyfork.org/en/scripts/405545-vidpolaris-redirect-userscript-vidpolaris-ml";
		} else if (window.location.href.split("/#")[0].includes("github.io")) {
			document.getElementById("userscriptLink").href = "https://greasyfork.org/en/scripts/405547-vidpolaris-redirect-userscript-github-io";
		} else {
			document.getElementById("userscriptLink").href = "https://greasyfork.org/en/script_versions/new";
		}
		toggleManual();
		hideCountry();
		createBookmark();
		document.title = "settings | vidpolaris";
	} else if (window.location.href.includes("#c#")){
		if (!localStorage.getItem("invIns") | localStorage.getItem("invIns") == "o") {
			openChannel(localStorage.getItem("sLoc"));
		} else {
			openChannel(localStorage.getItem("sLoc"), localStorage.getItem("invIns"));
		}
	} else if (window.location.href.includes("#adapt#")){
		adaptBookmark();
	} else if (window.location.href.includes("#p")){
		openPlaylist(localStorage.getItem("sLoc"))
	} else if (window.location.href.includes("#redir")) {
		redir()
	} else {
		home();
	}
}

function redir() {
	var url = getClickedId(window.location.href, "#redir#");
	document.title = "[redirecting...] vidpolaris"
	if (url.includes("youtu")) {
		if (url.includes("v=") | url.includes("youtu.be")) {
			if (url.includes("v=")) {
				var id = getClickedId(url, "v=");
				var fId = id.substring(0,11);
				window.open("#w#" + fId, "_self");
				console.log("redirecting...");
			} else if (url.includes("youtu.be")) {
				var id = getClickedId(url, "/");
				var fId = id.substring(0,11);
				window.open("#w#" + fId, "_self");
				console.log("redirecting...");
			}
		} else if (url.includes("?search_query=")) {
			var query = decodeURIComponent(getClickedId(url, "?search_query="));
			if (query.includes("&")) {
				var rQuery = "&" + getClickedId(query, "&");
				var fullQuery = query.replace(rQuery, "");
				window.open("#s#" + fullQuery.replace("+", " "), "_self");
			} else {
				window.open("#s#" + query.replace("+", " "), "_self");
			}
		} else if (url.includes("/c/") | url.includes("/channel/") | url.includes("/user/")){
			if (url.includes("/channel/")) {
				var cId = getClickedId(url, "/channel/");
				window.open("#c#" + cId, "_self")
			} else if (url.includes("/c/")) {
				var cId = getClickedId(url, "/c/");
				window.open("#c#" + cId, "_self")
			} else if (url.includes("/user/")) {
				var cId = getClickedId(url, "/user/");
				window.open("#c#" + cId, "_self")
			}
		} else if (url.includes("list=")) {
			var pId = getClickedId(url, "list=");
			window.open("#p#"+pId);
		}
	} else {
		window.open(url, "_self");
	}
}

function createBookmark() {
	if (!document.getElementById("bm")) {
		var w = window.location.href.replace("#settings", "");
		var b = "javascript:void(window.open('" + w + "#adapt#' + location.href, '_self'))"
		var a = document.createElement("A");
		a.innerHTML = "watch on vidpolaris";
		a.id = "bm"
		a.href = b;
		document.getElementById("bcm").appendChild(a);
	}
}

function openPlaylist(opt) {
	document.getElementById("playlistPage").style.display = "";
	document.getElementById("playLoader").style.display = "";
	document.getElementById("playlistViewer").style.display = "none";
	document.getElementById("homePage").style.display = 'none';
	document.getElementById("vidPage").style.display = 'none';
	document.getElementById("channelPage").style.display = 'none';
	document.getElementById("searchPage").style.display = 'none';
	document.getElementById("player").pause();
	document.title = "[loading...] vidpolaris"
	const http = new XMLHttpRequest();
	var id = getClickedId(window.location.href, "#p#");
	if (!opt | opt == "a") {
		var url = "https://vidpolaris.ml:9019/?playlistId=" + id;
	} else if (opt == "b") {
		var url = "https://vidpolaris.herokuapp.com/?playlistId=" + id;
	} else if (opt == "c") {
		var url = "https://vidpolaris-europe.herokuapp.com/?playlistId=" + id;
	}
	http.open("GET", url);
	http.send();
	http.onload=(e)=>{
		document.getElementById("playLoader").style.display = 'none';
		document.getElementById("playlistViewer").style.display = '';
		document.getElementById("playlistViewer").style = "margin-left:17.5%;margin-right:17.5%;margin-top:20px;";
		var jsond = JSON.parse(http.responseText);
		if (!jsond.err) {
			document.title = jsond.playlist.title + " | vidpolaris";
			document.getElementById("playlistName").innerHTML = jsond.playlist.title;
			document.getElementById("playlistAuthor").innerHTML = jsond.playlist.author.name;
			document.getElementById("playlistViews").innerHTML = jsond.playlist.views.toLocaleString() + " views";
			document.getElementById("playlistLength").innerHTML = jsond.playlist.total_items.toLocaleString() + " videos";
			document.getElementById("playlistUpdated").innerHTML = jsond.playlist.last_updated;
			document.getElementById("playlistDesc").innerHTML = jsond.playlist.description;
			if (jsond.playlist.visibility == "everyone" ) {
				document.getElementById("unlistedIco").style.display = "none";
			} else {
				document.getElementById("unlistedIco").style.display = "";
			}
			document.getElementById("playlistThumb").style = "height:" + document.getElementById("playlistInfo").clientHeight + "px;"; 
			document.getElementById("plAuLink").href = "#c#" + getClickedId(jsond.playlist.author.channel_url, "/channel/");
			document.getElementById("playlistThumb").src = jsond.playlist.items[0].thumbnail;
			document.getElementById("playlistItems").innerHTML = "";
			for (var c in jsond.playlist.items) {
				if (jsond.playlist.items[c].title == "[Deleted video]") {
					
				} else {
					var a = document.createElement("A");
					a.href = "#w#" + jsond.playlist.items[c].id;
					var div = document.createElement("DIV");
					div.classList.add("sResultVideo");
					var thu = document.createElement("IMG");
					thu.src = jsond.playlist.items[c].thumbnail;
					thu.classList.add("smallThumb");
					div.appendChild(thu);
					var tit = document.createElement("H2");
					tit.innerHTML = jsond.playlist.items[c].title;
					tit.classList.add("stat");
					div.appendChild(tit);
					var auth = document.createElement("H3");
					auth.innerHTML = "<span class='material-icons ico'>person</span> " + jsond.playlist.items[c].author.name;
					auth.classList.add("stat");
					div.appendChild(auth);
					var dur = document.createElement("H3");
					dur.classList.add("stat");
					dur.innerHTML = "<span class='material-icons ico'>timer</span> " + jsond.playlist.items[c].duration;
					div.appendChild(dur);
					a.appendChild(div);
					document.getElementById("playlistItems").appendChild(a);
				}
			}
		} else {
			playlistErr();
			return;
		}
	}
}

function adaptBookmark() {
	var url = getClickedId(window.location.href, "#adapt#");
	if (!url.includes("youtu")) {
		document.getElementById("errorPage").style.display = '';
		document.getElementById("errorTxt").innerHTML = "invalid url used with the bookmark!"
		document.getElementById("vidPage").style.display = 'none';
		document.getElementById("nsWarnPage").style.display = 'none';
		document.getElementById("settingsPage").style.display = 'none';
		document.getElementById("searchPage").style.display = 'none';
		document.getElementById("homePage").style.display = 'none';
		document.getElementById("bannerPfpContainer").style.display = 'none';
		console.log("failed to detect valid URL.");
	} else {
		if (url.includes("v=") | url.includes("youtu.be")) {
			if (url.includes("v=")) {
				var id = getClickedId(url, "v=");
				var fId = id.substring(0,11);
				window.open("#w#" + fId, "_self");
				console.log("redirecting...");
			} else if (url.includes("youtu.be")) {
				var id = getClickedId(url, "/");
				var fId = id.substring(0,11);
				window.open("#w#" + fId, "_self");
				console.log("redirecting...");
			}
		} else if (url.includes("?search_query=")) {
			var query = decodeURIComponent(getClickedId(url, "?search_query="));
			if (query.includes("&")) {
				var rQuery = "&" + getClickedId(query, "&");
				var fullQuery = query.replace(rQuery, "");
				window.open("#s#" + fullQuery.replace("+", " "), "_self");
			} else {
				window.open("#s#" + query.replace("+", " "), "_self");
			}
		} else if (url.includes("/c/") | url.includes("/channel/") | url.includes("/user/")){
			if (url.includes("/channel/")) {
				var cId = getClickedId(url, "/channel/");
				window.open("#c#" + cId, "_self")
			} else if (url.includes("/c/")) {
				var cId = getClickedId(url, "/c/");
				window.open("#c#" + cId, "_self")
			} else if (url.includes("/user/")) {
				var cId = getClickedId(url, "/user/");
				window.open("#c#" + cId, "_self")
			}
		} else if (url.includes("list=")) {
			var pId = getClickedId(url, "list=");
			window.open("#p#"+pId);
		} else if (url.includes("/embed/")){
			var id = getClickedId(url, "/embed/");
			var fId = id.substring(0,11);
			window.open("embed#w#" + fId, "_self");
		}
	}
}

function sync() {
	document.getElementById("player").addEventListener("playing", function() {
		if (localStorage.getItem("smart") == 'y') {
			document.getElementById("audioPlayer").play();
			document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
		}
	});
	document.getElementById("player").addEventListener("pause", function() { 
		if (localStorage.getItem("smart") == 'y') {
			document.getElementById("audioPlayer").pause();
			document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
		}
	});
	document.getElementById("player").addEventListener("timeUpdate", function() { 
		if (localStorage.getItem("smart") == 'y') {
			document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
		}
	});
	document.getElementById("player").addEventListener("seeked", function() { 
		if (localStorage.getItem("smart") == 'y') {
			document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
		}
	});
	document.getElementById("player").addEventListener("seeking", function() { 
		if (localStorage.getItem("smart") == 'y') {
			document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
		}
	});
	document.getElementById('player').addEventListener('ended', function() {
		if (localStorage.getItem("smart") == 'y') {
			document.getElementById("audioPlayer").pause();
		}
		if (localStorage.getItem("autoplay") == 'y') {
			if (!document.getElementById("relatedVideos").style.display == 'none') {
				console.log("autoplay is on / didn't found video");
			} else {
				console.log("autoplay is on / found video / now redirecting...")
				setTimeout( function () {
					document.getElementById("rv1").click()
				}, 1000)
			}
		}
	});
	document.getElementById("player").onwaiting = function(){
		if (localStorage.getItem("smart") == 'y') {
			document.getElementById("audioPlayer").pause();
		}
	};
}

function saveSettings() {
	localStorage.setItem("smart", document.getElementById("sq").value);
	localStorage.setItem("theme", document.getElementById("wTheme").value);
	localStorage.setItem("sLoc", document.getElementById("server").value);
	localStorage.setItem("suggest", document.getElementById("suggest").value);
	localStorage.setItem("country", document.getElementById("country").value);
	localStorage.setItem("loadComm", document.getElementById("autoComm").value);
	localStorage.setItem("disableCards", document.getElementById("disableCards").value);
	localStorage.setItem("showReddit", document.getElementById("showReddit").value);
	localStorage.setItem("homePage", document.getElementById("home").value);
	localStorage.setItem("sqFail", document.getElementById("sqFailure").value);
	localStorage.setItem("allowAutoScale", document.getElementById("aas").value);
	localStorage.setItem("invIns", document.getElementById("invIns").value);
	localStorage.setItem("showSize", document.getElementById("showSize").value);
	localStorage.setItem("skipSponsors", document.getElementById("skipSponsors").value);
	localStorage.setItem("injectRedir", document.getElementById("injectRedir").value);
	localStorage.setItem("supportHDR", document.getElementById("hdrSupport").value);
	if (document.getElementById("aas").value == "n") {
		localStorage.setItem("mScale", document.getElementById("mScale").value);
		resize("manual", localStorage.getItem("mScale"));
	} else {
		resize("auto");
	}
	window.history.back();
	if (!window.location.href.includes("#")) {
		home();
	}
}

function hideCountry() {
	if (document.getElementById("home").value == "inv") {
		document.getElementById("country").style.display = "";
	} else {
		document.getElementById("country").style.display = "none";
	}
}

function toggleManual() {
	if (document.getElementById("aas").value == "y") {
		document.getElementById("mScale").disabled = true;
	} else {
		document.getElementById("mScale").removeAttribute("disabled");
	}
}

function toggleFilters() {
	if (!document.getElementById("filters").style.display == "") {
		document.getElementById("filters").style.display = "";
	} else {
		document.getElementById("filters").style.display = "none";
	}
}

function dismiss() {
	localStorage.setItem('dissmissed', 'y')
	document.getElementById("lasaga").style.display = 'none';
}

function getComments(token, opt) {
	if (!token | token == "none") {
		document.getElementById("loadedComments").style.display = 'none';
		document.getElementById("loadedComments").innerHTML = "";
		document.getElementById("loadedC").style.display = 'none';
		document.getElementById("errorC").style.display = 'none';
		document.getElementById("loadC").style.display = 'none';
		document.getElementById("loadinC").style.display = '';
		var id = getClickedId(window.location.href, '#w#');
		var fullUrl = "https://youtube.com/watch?v=" + id;
		const http = new XMLHttpRequest();
		if (opt == "a" | !opt) {
			var url = "https://vidpolaris.ml:9019/?comments=1&url=" + fullUrl;
		} else if (opt == "b"){
			var url = "https://vidpolaris.herokuapp.com/?comments=1&url=" + fullUrl
		} else if (opt == "c") {
			var url = "https://vidpolaris-europe.herokuapp.com/?comments=1&url=" + fullUrl
		}
		http.open("GET", url);
		http.send();
		http.timeout = 10000;
		http.ontimeout = () => {
			if (opt == "a" | !opt) {
				if (!localStorage.getItem("sLoc") == "b") {
					getComments("none", "b");
				} else {
					document.getElementById("errorC").style.display = '';
					document.getElementById("loadinC").style.display = 'none';
					document.getElementById("loadedC").style.display = 'none';
				}
			} else if (opt == "b"){
				if (!localStorage.getItem("sLoc") == "c") {
					getComments("none", "c");
				} else {
					document.getElementById("errorC").style.display = '';
					document.getElementById("loadinC").style.display = 'none';
					document.getElementById("loadedC").style.display = 'none';
				}
			} else if (opt == "c") {
				if (!localStorage.getItem("sLoc") == "a") {
					getComments("none", "a");
				} else {
					document.getElementById("errorC").style.display = '';
					document.getElementById("loadinC").style.display = 'none';
					document.getElementById("loadedC").style.display = 'none';
				}
			}
		}
		http.onload=()=>{
			var jsond = JSON.parse(http.responseText);
			for (var c in jsond.comments) {
				var div = document.createElement("DIV");
				div.classList.add("comment");
				if (c == 0 && jsond.comments[0].timestamp && jsond.comments[1].timestamp) {
					if (jsond.comments[0].timestamp < jsond.comments[1].timestamp) {
						var pinned = document.createElement("P");
						pinned.classList.add("stat");
						pinned.innerHTML = "<span class='ico material-icons'>announcement</span> pinned comment";
						pinned.style = "margin-bottom:5px;";
						div.appendChild(pinned);
					}
				}
				var img = document.createElement("IMG");
				img.src = jsond.comments[c].authorThumb;
				img.classList.add("smallPfp");
				div.appendChild(img);
				if (jsond.comments[c].authorLink && jsond.comments[c].author) {
					var cLink = document.createElement("A");
					cLink.classList.add("channelLink");
					cLink.href = "#c#" + jsond.comments[c].authorLink.substring(9);
					div.appendChild(cLink);
					var h3 = document.createElement("H3");
					h3.classList.add("cAuthor");
					h3.innerHTML = jsond.comments[c].author;
					cLink.appendChild(h3);
				} else {
					var h3 = document.createElement("H3");
					h3.innerHTML = "[Channel unavailable]";
					div.appendChild(h3);
				}
				var cText = document.createElement("P");
				cText.id = jsond.comments[c].id + "_text";
				cText.innerHTML = varLinks(jsond.comments[c].text.replace(/\n/g, "<br>"));
				cText.classList.add("cText");
				var stats = document.createElement("P");
				stats.classList.add("stat");
				if (!jsond.comments[c].numReplies) {
					var rep = "0";
				} else {
					var rep = jsond.comments[c].numReplies;
				}
				var tFunction = `translate('` + jsond.comments[c].id + `_text')`
				stats.innerHTML = "<span class='material-icons ico'>comment</span> " + rep + " replies • <span class='material-icons ico'>thumb_up</span> " + jsond.comments[c].likes.toLocaleString() + " likes • <span onclick=" + tFunction + " style='cursor:pointer'><span class='material-icons ico'>translate</span> translate this comment</span> • <span>posted " + jsond.comments[c].time + "</span>";
				div.appendChild(cText);
				div.appendChild(stats);
				document.getElementById("loadedComments").appendChild(div);
			}
			document.getElementById("loadinC").style.display = "none";
			document.getElementById("loadedC").style.display = "";
			document.getElementById("loadedComments").style.display = "";
			var button = document.getElementsByTagName("button");
			for (var c in button) {
				if (button[c].innerHTML == "load more comments") {
					button[c].style = "display:none;"
				}
			}
			if (jsond.npToken) {
				var button = document.createElement("BUTTON");
				button.onclick = function() {
					getComments(jsond.npToken, localStorage.getItem("sLoc"));
				}
				button.innerHTML = "load more comments"
				document.getElementById("loadedComments").appendChild(button)
			}
		}
	} else {
		document.getElementById("loadedC").style.display = 'none';
		document.getElementById("errorC").style.display = 'none';
		document.getElementById("loadC").style.display = 'none';
		document.getElementById("loadinC").style.display = '';
		var id = getClickedId(window.location.href, '#w#');
		var fullUrl = "https://youtube.com/watch?v=" + id;
		const http = new XMLHttpRequest();
		if (opt == "a" | !opt) {
			var url = "https://vidpolaris.ml:9019/?comments=1&token=" + token + "&url=" + fullUrl;
		} else if (opt == "b"){
			var url = "https://vidpolaris.herokuapp.com/?comments=1&token=" + token + "&url=" + fullUrl;
		} else if (opt == "c") {
			var url = "https://vidpolaris-europe.herokuapp.com/?comments=1&token=" + token + "&url=" + fullUrl;
		}
		http.open("GET", url);
		http.send();
		http.timeout = 10000;
		http.ontimeout = () => {
			if (opt == "a" | !opt) {
				if (!localStorage.getItem("sLoc") == "b") {
					getComments("none", "b");
				} else {
					document.getElementById("errorC").style.display = '';
					document.getElementById("loadinC").style.display = 'none';
					document.getElementById("loadedC").style.display = 'none';
				}
			} else if (opt == "b"){
				if (!localStorage.getItem("sLoc") == "c") {
					getComments("none", "c");
				} else {
					document.getElementById("errorC").style.display = '';
					document.getElementById("loadinC").style.display = 'none';
					document.getElementById("loadedC").style.display = 'none';
				}
			} else if (opt == "c") {
				if (!localStorage.getItem("sLoc") == "a") {
					getComments("none", "a");
				} else {
					document.getElementById("errorC").style.display = '';
					document.getElementById("loadinC").style.display = 'none';
					document.getElementById("loadedC").style.display = 'none';
				}
			}
		}
		http.onload=(e)=>{
			var jsond = JSON.parse(http.responseText);
			for (var c in jsond.comments) {
				var div = document.createElement("DIV");
				div.classList.add("comment");
				var img = document.createElement("IMG");
				img.src = jsond.comments[c].authorThumb;
				img.classList.add("smallPfp");
				div.appendChild(img);
				if (jsond.comments[c].authorLink && jsond.comments[c].author) {
					var cLink = document.createElement("A");
					cLink.classList.add("channelLink");
					cLink.href = "#c#" + jsond.comments[c].authorLink.substring(9);
					div.appendChild(cLink);
					var h3 = document.createElement("H3");
					h3.classList.add("cAuthor");
					h3.innerHTML = jsond.comments[c].author;
					cLink.appendChild(h3);
				} else {
					var h3 = document.createElement("H3");
					h3.innerHTML = "[Channel unavailable]";
					div.appendChild(h3);
				}
				var cText = document.createElement("P");
				cText.id = jsond.comments[c].id + "_text";
				cText.innerHTML = varLinks(jsond.comments[c].text.replace(/\n/g, "<br>"));
				cText.classList.add("cText");
				var stats = document.createElement("P");
				stats.classList.add("stat");
				if (!jsond.comments[c].numReplies) {
					var rep = "0";
				} else {
					var rep = jsond.comments[c].numReplies;
				}
				var tFunction = `translate('` + jsond.comments[c].id + `_text')`
				stats.innerHTML = "<span class='material-icons ico'>comment</span> " + rep + " replies • <span class='material-icons ico'>thumb_up</span> " + jsond.comments[c].likes.toLocaleString() + " likes • <span onclick=" + tFunction + " style='cursor:pointer'><span class='material-icons ico'>translate</span> translate this comment</span> • <span>posted " + jsond.comments[c].time + "</span>";
				div.appendChild(cText);
				div.appendChild(stats);
				document.getElementById("loadedComments").appendChild(div);
			}
			document.getElementById("loadinC").style.display = "none";
			document.getElementById("loadedC").style.display = "";
			document.getElementById("loadedComments").style.display = "";
			var button = document.getElementsByTagName("button");
			for (var c in button) {
				if (button[c].innerHTML == "load more comments") {
					button[c].style = "display:none;"
				}
			}
			if (jsond.npToken) {
				var button = document.createElement("BUTTON");
				button.onclick = function() {
					getComments(jsond.npToken, localStorage.getItem("sLoc"));
				}
				button.innerHTML = "load more comments"
				document.getElementById("loadedComments").appendChild(button)
			}
		}
	}
}

function toggleAuto() {
	setTimeout( function () {
		if (document.getElementById("apSwitch").checked) {
			localStorage.setItem("autoplay", "y");
			document.getElementById("lpSwitch").checked = false;
			document.getElementById("player").removeAttribute("loop");
		} else {
			localStorage.setItem("autoplay", "n");
		}
	}, 100)
}

function toggleLoop() {
	setTimeout( function () {
		if (document.getElementById("lpSwitch").checked) {
			document.getElementById("player").loop = "true";
			document.getElementById("apSwitch").checked = false;
			if (document.getElementById("player").ended == true) {
				document.getElementById("player").currentTime = 0;
				document.getElementById("player").play();
			}
			localStorage.setItem("autoplay", "n");
		} else {
			document.getElementById("player").removeAttribute("loop");
		}
	}, 100)
}


function changeQ(opt) {
	if (document.getElementById("itag").innerHTML == document.getElementById("qOptions").value) {
		return;
	} else {
		document.getElementById("qOptions").disabled = true;
		document.getElementById("aqOptions").disabled = true;
		const http = new XMLHttpRequest();
		var id = getClickedId(window.location.href, '#w#');
		var fullUrl = "https://youtube.com/watch?v=" + id;
		if (opt == "a" | !opt) {
			var url = "https://vidpolaris.ml:9019/?itag=" + document.getElementById("qOptions").value + "&url=" + fullUrl
		} else if (opt == "b"){
			var url = "https://vidpolaris.herokuapp.com/?itag=" + document.getElementById("qOptions").value + "&url=" + fullUrl
		} else if (opt == "c") {
			var url = "https://vidpolaris-europe.herokuapp.com/?itag=" + document.getElementById("qOptions").value + "&url=" + fullUrl
		}
		http.open("GET", url);
		http.send();
		http.onload=(e)=>{
			var jsond = JSON.parse(http.responseText);
			var currentTime = document.getElementById("player").currentTime;
			document.getElementById("itag").innerHTML = jsond.datainfo.itag;
			document.getElementById("player").src = jsond.datainfo.url;
			document.getElementById("player").currentTime = currentTime;
			document.getElementById("player").onloadeddata = function () {
				document.getElementById("player").play();
				document.getElementById("playerContainer").style.display = "";
				document.getElementById("qOptions").disabled = false;
				document.getElementById("aqOptions").disabled = false;
			}
		}
		http.timeout = 3000;
		http.ontimeout = () => {
			if (opt == "a" | !opt) {
				changeQ("b");
			} else if (opt == "b"){
				changeQ("c");
			} else if (opt == "c") {
				changeQ("a");
			}
		}
	}
}

function changeAQ(opt) {
	document.getElementById("qOptions").disabled = true;
	document.getElementById("aqOptions").disabled = true;
	document.getElementById("player").pause();
	document.getElementById("playerContainer").style.display = "none";
	const http = new XMLHttpRequest();
	var id = getClickedId(window.location.href, '#w#');
	var fullUrl = "https://youtube.com/watch?v=" + id;
	if (opt == "a" | !opt) {
		var url = "https://vidpolaris.ml:9019/?itag=" + document.getElementById("aqOptions").value + "&url=" + fullUrl
	} else if (opt == "b"){
		var url = "https://vidpolaris.herokuapp.com/?itag=" + document.getElementById("aqOptions").value + "&url=" + fullUrl
	} else if (opt == "c") {
		var url = "https://vidpolaris-europe.herokuapp.com/?itag=" + document.getElementById("aqOptions").value + "&url=" + fullUrl
	}
	http.open("GET", url);
	http.send();
	http.onload=(e)=>{
		var jsond = JSON.parse(http.responseText);
		var currentTime = document.getElementById("player").currentTime;
		document.getElementById("itag").innerHTML = jsond.datainfo.itag;	
		document.getElementById("audioPlayer").src = jsond.datainfo.url;
		document.getElementById("audioPlayer").currentTime = currentTime;
		document.getElementById("audioPlayer").onloadeddata= function () {
			document.getElementById("player").play();
			document.getElementById("playerContainer").style.display = "";
			document.getElementById("qOptions").disabled = false;
			document.getElementById("aqOptions").disabled = false;
		}
	}
	http.timeout = 3000;
	http.ontimeout = () => {
		if (opt == "a" | !opt) {
			changeAQ("b");
		} else if (opt == "b"){
			changeAQ("c");
		} else if (opt == "c") {
			changeAQ("a");
		}
	}
}

function translate(elem) {
	if (!elem) {
		return;
	} else {
		var tex = document.getElementById(elem).innerHTML;
		document.getElementById(elem).innerHTML = "(translating...)"
		if (!sessionStorage.getItem("currentlyRunningT") | sessionStorage.getItem("currentlyRunningT") == "n") {
			sessionStorage.setItem("currentlyRunningT", "y");
			const http = new XMLHttpRequest();
			if (localStorage.getItem("sLoc") == "a" | !localStorage.getItem("sLoc")) {
				var url = "https://vidpolaris.ml:9019/?to=en&translate=" + encodeURIComponent(tex);
			} else if (localStorage.getItem("sLoc") == "b"){
				var url = "https://vidpolaris.herokuapp.com/?to=en&translate=" + encodeURIComponent(tex);
			} else if (localStorage.getItem("sLoc") == "c") {
				var url = "https://vidpolaris-europe.herokuapp.com/?to=en&translate=" + encodeURIComponent(tex);
			}
			http.open("GET", url);
			http.send();
			http.onload=(e)=>{
				var jsond = JSON.parse(http.responseText);
				var tTex = jsond.res.text;
				var f = jsond.res.from.language.iso;
				if (f == "af") {
					var fTex = "afrikaans";
				} else if (f == "sq") {
					var fTex = "albanian";
				} else if (f == "am") {
					var fTex = "amharic";
				} else if (f == "ar") {
					var fTex = "arabic";
				} else if (f == "hy") {
					var fTex = "armenian";
				} else if (f == "az") {
					var fTex = "azerbaijani";
				} else if (f == "eu") {
					var fTex = "basque";
				} else if (f == "be") {
					var fTex = "belarusian";
				} else if (f == "bn") {
					var fTex = "bengali";
				} else if (f == "bs") {
					var fTex = "bosnian";
				} else if (f == "bg") {
					var fTex = "bulgarian";
				} else if (f == "ca") {
					var fTex = "catalan";
				} else if (f == "ceb") {
					var fTex = "cebuano";
				} else if (f == "ny") {
					var fTex = "chichewa";
				} else if (f == "zh-CN") {
					var fTex = "chinese (simplified)";
				} else if (f == "zh-TW") {
					var fTex = "chinese (traditional)";
				} else if (f == "co") {
					var fTex = "corsican";
				} else if (f == "hr") {
					var fTex = "croatian";
				} else if (f == "cz") {
					var fTex = "czech";
				} else if (f == "da") {
					var fTex = "danish";
				} else if (f == "nl") {
					var fTex = "dutch";
				} else if (f == "en") {
					var fTex = "english";
				} else if (f == "eo") {
					var fTex = "esperanto";
				} else if (f == "et") {
					var fTex = "estonian";
				} else if (f == "tl") {
					var fTex = "filipino";
				} else if (f == "fi") {
					var fTex = "finnish";
				} else if (f == "fr") {
					var fTex = "french";
				} else if (f == "fy") {
					var fTex = "frisian";
				} else if (f == "gl") {
					var fTex = "galician";
				} else if (f == "ka") {
					var fTex = "georgian";
				} else if (f == "de") {
					var fTex = "german";
				} else if (f == "el") {
					var fTex = "greek"
				} else if (f == "gu") {
					var fTex = "gujarati";
				} else if (f == "ht") {
					var fTex = "haitian creole";
				} else if (f == "ha") {
					var fTex = "hausa";
				} else if (f == "haw") {
					var fTex = "hawaiian";
				} else if (f == "iw") {
					var fTex = "hebrew";
				} else if (f == "hi") {
					var fTex = "hindi";
				} else if (f == "hmn") {
					var fTex = "hmong";
				} else if (f == "hu") {
					var fTex = "hungarian";
				} else if (f == "is") {
					var fTex = "icelandic";
				} else if (f == "ig") {
					var fTex = "igbo";
				} else if (f == "id") {
					var fTex = "indonesian";
				} else if (f == "ga") {
					var fTex = "irish";
				} else if (f == "it") {
					var fTex = "italian";
				} else if (f == "ja") {
					var fTex = "japanese";
				} else if (f == "jw") {
					var fTex = "javanese";
				} else if (f == "kn") {
					var fTex = "kannada";
				} else if (f == "kk") {
					var fTex = "kazakh";
				} else if (f == "km") {
					var fTex = "khmer";
				} else if (f == "ko") {
					var fTex = "korean";
				} else if (f == "ku") {
					var fTex = "kurdish (kurmanji)";
				} else if (f == "ky") {
					var fTex = "kyrgyz";
				} else if (f == "lo") {
					var fTex = "lao";
				} else if (f == "la") {
					var fTex = "latin";
				} else if (f == "lv") {
					var fTex = "latvian";
				} else if (f == "lt") {
					var fTex = "lithuanian";
				} else if (f == "lb") {
					var fTex = "luxembourgish";
				} else if (f == "mk") {
					var fTex = "macedonian";
				} else if (f == "mg") {
					var fTex = "malagasy";
				} else if (f == "ms") {
					var fTex = "malay";
				} else if (f == "ml") {
					var fTex = "malayalam";
				} else if (f == "mt") {
					var fTex = "maltese";
				} else if (f == "mi") {
					var fTex = "maori";
				} else if (f == "mr") {
					var fTex = "marathi";
				} else if (f == "mn") {
					var fTex = "mongolain";
				} else if (f == "my") {
					var fTex = "myanmar (burmese)";
				} else if (f == "ne") {
					var fTex = "nepali";
				} else if (f == "no") {
					var fTex = "norwegian";
				} else if (f == "ps") {
					var fTex = "pashto";
				} else if (f == "fa") {
					var fTex = "persian";
				} else if (f == "pl") {
					var fTex = "polish";
				} else if (f == "pt") {
					var fTex = "portuguese";
				} else if (f == "pa") {
					var fTex = "punjabi";
				} else if (f == "ro") {
					var fTex = "romanian";
				} else if (f == "ru") {
					var fTex = "russian";
				} else if (f == "sm") {
					var fTex = "samoan";
				} else if (f == "gd") {
					var fTex = "scots gaelic";
				} else if (f == "sr") {
					var fTex = "serbian";
				} else if (f == "st") {
					var fTex = "sesotho";
				} else if (f == "sn") {
					var fTex = "shona";
				} else if (f == "sd") {
					var fTex = "sindhi";
				} else if (f == "si") {
					var fTex = "sinhala";
				} else if (f == "sk") {
					var fTex = "slovak";
				} else if (f == "sl") {
					var fTex = "solvenian";
				} else if (f == "so") {
					var fTex = "somali";
				} else if (f == "es") {
					var fTex = "spanish";
				} else if (f == "su") {
					var fTex = "sundanese";
				} else if (f == "sw") {
					var fTex = "swahili";
				} else if (f == "sv") {
					var fTex = "swedish";
				} else if (f == "tg") {
					var fTex = "tajik";
				} else if (f == "ta") {
					var fTex = "tamil";
				} else if (f == "te") {
					var fTex = "telugu";
				} else if (f == "th") {
					var fTex = "thai";
				} else if (f == "tr") {
					var fTex = "turkish";
				} else if (f == "uk") {
					var fTex = "ukrainian";
				} else if (f == "ur") {
					var fTex = "urdu";
				} else if (f == "uz") {
					var fTex = "uzbek";
				} else if (f == "vi") {
					var fTex = "vietnamese";
				} else if (f == "cy") {
					var fTex = "welsh";
				} else if (f == "xh") {
					var fTex = "xhosa";
				} else if (f == "yi") {
					var fTex = "yiddish";
				} else if (f == "yo") {
					var fTex = "yoruba";
				} else if (f == "zu") {
					var fTex = "zulu";
				} else {
					var fTex = jsond.res.from.language.iso + " (if you see this, report it to <a href='https://twitter.com/normanisnotrad' class='channelLink'>my twitter</a>)";
				}
 				document.getElementById(elem).innerHTML = tTex + " (translated from " + fTex + ")";
				sessionStorage.setItem("currentlyRunningT", "n");
			}
			http.timeout = 5000;
			http.ontimeout = () => {
				sessionStorage.setItem("currentlyRunningT", "n");
				document.getElementById(elem).innerHTML = tex + " (error translating)"
			}
		} else {
			console.log("please wait for the other translation to finish loading...");
			return;
		}
	}
}

function theatre(mode) {
	if (document.getElementById("theme").href.includes("mobile.css")) {
		console.log("error - mobile css on");
	} else {
		if (!mode){
			if (document.getElementById("player").style.width == "60%" | !document.getElementById("player").style.width) {
				document.getElementById("player").style = "max-height:840px;";
				document.getElementById("player").style.width = "100%";
				document.getElementById("theat_native").innerHTML = "back to normal"
				localStorage.setItem("theatre" , "y")
			} else {
				document.getElementById("player").style = "max-height:645px;";
				document.getElementById("player").style.width = "60%";
				document.getElementById("theat_native").innerHTML = "theater mode"
				localStorage.setItem("theatre" , "n")
			}
		} else {
			if (document.getElementById("embedContainer").style.width == "60%" | !document.getElementById("embedContainer").style.width) {
				document.getElementById("embedContainer").style = "height:860px;";
				document.getElementById("frame").style = "height:840px;";
				document.getElementById("embedContainer").style.width = "100%";
				document.getElementById("theat_embed").innerHTML = "back to normal"
				localStorage.setItem("theatre" , "y")
			} else {
				document.getElementById("embedContainer").style = "height:670px;margin-left:20%;";
				document.getElementById("frame").style = "height:645px;";
				document.getElementById("embedContainer").style.width = "60%";
				document.getElementById("theat_embed").innerHTML = "theater mode"
				localStorage.setItem("theatre" , "n")
			}
		}
	}
}

function showWarning() {
	if (localStorage.getItem("ageR") == "n" | !localStorage.getItem("ageR")) {
		document.getElementById("nsWarnPage").style.display = '';
		document.getElementById("vidPage").style.display = 'none';
		setTimeout(function() {
			document.getElementById("player").pause();
			document.getElementById("player").currentTime = 0;
		}, 5000)
	} else {
		return;
	}
}

function showContent(choice) {
	if (choice == 'y') {
		document.getElementById("vidPage").style.display = '';
		document.getElementById("nsWarnPage").style.display = 'none';
		localStorage.setItem('ageR', 'y');
	} else if (choice == 'y_ns') {
		document.getElementById("vidPage").style.display = '';
		document.getElementById("nsWarnPage").style.display = 'none';
		localStorage.setItem('ageR', 'n');
	} else {
		window.open("#", "_self");
		localStorage.setItem('ageR', 'n');
	}
}

function notPlayable(rs) {
	document.getElementById("errorPage").style.display = '';
	if (!rs) {
		document.getElementById("errorTxt").innerHTML = "for one reason or another, this video cannot be played. try again or watch it on youtube itself."
	} else {
		document.getElementById("errorTxt").innerHTML = rs
	}
	document.getElementById("vidPage").style.display = 'none';
	document.getElementById("nsWarnPage").style.display = 'none';
	document.getElementById("settingsPage").style.display = 'none';
	document.getElementById("searchPage").style.display = 'none';
	document.getElementById("playlistPage").style.display = 'none';
	document.getElementById("homePage").style.display = 'none';
	document.getElementById("bannerPfpContainer").style.display = 'none';
	document.title = "[!] vidpolaris";
}

function playlistErr() {
	document.getElementById("errorPage").style.display = '';
	document.getElementById("errorTxt").innerHTML = "the playlist could not be retrieved. is it private?"
	document.getElementById("vidPage").style.display = 'none';
	document.getElementById("nsWarnPage").style.display = 'none';
	document.getElementById("settingsPage").style.display = 'none';
	document.getElementById("searchPage").style.display = 'none';
	document.getElementById("homePage").style.display = 'none';
	document.getElementById("playlistPage").style.display = 'none';
	document.getElementById("bannerPfpContainer").style.display = 'none';
	document.title = "[!] vidpolaris";
}

function openChannel(opt,inst) {
	document.title = "[loading...] vidpolaris";
	document.getElementById("player").pause();
	document.getElementById("resultsContainer").style.display = 'none';
	document.getElementById("searchTerm").style.display = "none";
	document.getElementById("helpOut").style.display = 'none';
	document.getElementById("playlistPage").style.display = 'none';
	document.getElementById("vidPage").style.display = 'none';
	document.getElementById("searchContainer").style.display = 'none';
	document.getElementById("homePage").style.display = 'none';
	document.getElementById("settingsPage").style.display = 'none';
	document.getElementById("channelPage").style.display = '';
	document.getElementById("chanLoader").style.display = '';
	document.getElementById("dependButtons").innerHTML = '';
	document.getElementById("chanViewer").style.display = 'none';
	document.getElementById("bannerPfpContainer").style.display = 'none';
	document.getElementById("aboutPage").style.display = 'none';
	document.getElementById("allUploadsPage").style.display = "none";
	if (sessionStorage.getItem("noUploads")) {
		sessionStorage.removeItem("noUploads");
	}
	const http = new XMLHttpRequest();
	var id = getClickedId(window.location.href, '#c#');
	if (id.includes("/videos")) {
		window.open("#c#" + id.replace("/videos", ""), "_self")
	} else if (id.includes("/channels")) {
		window.open("#c#" + id.replace("/channels", ""), "_self")
	} else if (id.includes("/playlists")) {
		window.open("#c#" + id.replace("/playlists", ""), "_self")
	} else if (id.includes("/community")) {
		window.open("#c#" + id.replace("/community", ""), "_self")
	} else if (id.includes("/about")) {
		window.open("#c#" + id.replace("/about", ""), "_self")
	} else if (id.includes("/featured")) {
		window.open("#c#" + id.replace("/featured", ""), "_self")
	}
	if (!inst | inst == "o") {
		if (opt == "a" | !opt) {
			var url = "https://vidpolaris.ml:9019/?channelId=" + id;
		} else if (opt == "b"){
			var url = "https://vidpolaris.herokuapp.com/?channelId=" + id;
		} else if (opt == "c") {
			var url = "https://vidpolaris-europe.herokuapp.com/?channelId=" + id;
		}
	} else {
		if (opt == "a" | !opt) {
			var url = "https://vidpolaris.ml:9019/?channelId=" + id;
		} else if (opt == "b"){
			var url = "https://vidpolaris.herokuapp.com/?channelId=" + id;
		} else if (opt == "c") {
			var url = "https://vidpolaris-europe.herokuapp.com/?channelId=" + id;
		}
	}
	http.open("GET", url);
	http.send();
	http.onload=(e)=>{
		var jsond = JSON.parse(http.responseText);
		if (jsond.error) {
			document.getElementById("errorPage").style.display = '';
			document.getElementById("errorTxt").innerHTML = "for one reason or another, this channel could not be opened. try again or see it on youtube itself."
			document.getElementById("vidPage").style.display = 'none';
			document.getElementById("channelPage").style.display = 'none';
			document.getElementById("nsWarnPage").style.display = 'none';
			document.getElementById("settingsPage").style.display = 'none';
			document.getElementById("searchPage").style.display = 'none';
			document.getElementById("homePage").style.display = 'none';
			document.getElementById("bannerPfpContainer").style.display = 'none';
			document.getElementById("allUploadsPage").style.display = 'none';
			document.getElementById("aboutPage").style.display = 'none';
			document.getElementById("searchContainer").style.display = '';
		} else {
			if (jsond.authorBanners[0]) {
				document.getElementById("banner").src = jsond.authorBanners[0].url.split('-fcrop')[0];
			} else {
				document.getElementById("banner").src = "img/banner.png";
			}
			document.getElementById("profilePic").src = jsond.authorThumbnails[0].url.split('=s')[0];
			document.getElementById("profilePic").src = jsond.authorThumbnails[0].url.split('=s')[0];
			if (!jsond.subCount == 0) {
				document.getElementById("subCount").innerHTML = jsond.subCount.toLocaleString();
			} else {
				if (jsond.totalViews > 5000) {
					document.getElementById("subCount").innerHTML = "[disabled]";
				} else {
					document.getElementById("subCount").innerHTML = 0;
				}
			}
			document.getElementById("viewCount").innerHTML = jsond.totalViews.toLocaleString();
			document.getElementById("chanName").innerHTML = jsond.author;
			document.getElementById("channelDesc").innerHTML = varLinks(jsond.description.replace(/\n/g, "<br>"));
			var emails = jsond.description.match(/[\w-\.]+@[\w]+\.+[a-zA-Z]{2,4}/g);
			for (var c in emails) {
				var a = document.createElement("A");
				a.href = "mailto:" + emails[c];
				var b = document.createElement("BUTTON");
				b.innerHTML = "<span class='material-icons ico'>email</span> " + emails[c];
				a.appendChild(b);
				document.getElementById("dependButtons").appendChild(a);
			}
			var links = document.getElementById("channelDesc").querySelectorAll("a");
			for (var c in links) {
				console.log(links[c].href)
				if (links[c].href) {
					// support
					if (links[c].href.includes("https://www.patreon.com/join") | links[c].href.includes("https://patreon.com/join")) {
						var a = document.createElement("A");
						a.href = links[c].href;
						var b = document.createElement("BUTTON");
						b.style = "margin:3px;";
						b.innerHTML = "<span class='material-icons ico'>attach_money</span> donate (patreon)";
						a.appendChild(b);
						document.getElementById("dependButtons").appendChild(a);
					} else if (links[c].href.includes("https://www.cameo.com") | links[c].href.includes("https://cameo.com")){
						var a = document.createElement("A");
						a.href = links[c].href;
						var b = document.createElement("BUTTON");
						b.style = "margin:3px;";
						b.innerHTML = "<span class='material-icons ico'>attach_money</span> donate (cameo)";
						a.appendChild(b);
						document.getElementById("dependButtons").appendChild(a);
					} else if (links[c].href.includes("https://www.streamlabs.com/") | links[c].href.includes("https://streamlabs.com/")) {
						var a = document.createElement("A");
						a.href = links[c].href;
						var b = document.createElement("BUTTON");
						b.style = "margin:3px;";
						b.innerHTML = "<span class='material-icons ico'>attach_money</span> donate (streamlabs)";
						a.appendChild(b);
						document.getElementById("dependButtons").appendChild(a);
					}
					// socials
					if (links[c].href.includes("https://www.twitter.com") | links[c].href.includes("https://twitter.com/")) {
						var a = document.createElement("A");
						a.href = links[c].href;
						var b = document.createElement("BUTTON");
						b.style = "margin:3px;";
						b.innerHTML = "<span class='material-icons ico'>people</span> twitter";
						a.appendChild(b);
						document.getElementById("dependButtons").appendChild(a);
					} else if (links[c].href.includes("https://www.facebook.com") | links[c].href.includes("https://facebook.com/")) {
						var a = document.createElement("A");
						a.href = links[c].href;
						var b = document.createElement("BUTTON");
						b.style = "margin:3px;";
						b.innerHTML = "<span class='material-icons ico'>people</span> facebook";
						a.appendChild(b);
						document.getElementById("dependButtons").appendChild(a);
					} else if (links[c].href.includes("https://www.instagram.com") | links[c].href.includes("https://instagram.com/")) {
						var a = document.createElement("A");
						a.href = links[c].href;
						var b = document.createElement("BUTTON");
						b.style = "margin:3px;";
						b.innerHTML = "<span class='material-icons ico'>photo_camera</span> instagram";
						a.appendChild(b);
						document.getElementById("dependButtons").appendChild(a);
					} else if (links[c].href.includes("https://www.twitch.tv") | links[c].href.includes("https://twitch.tv/")) {
						var a = document.createElement("A");
						a.href = links[c].href;
						var b = document.createElement("BUTTON");
						b.style = "margin:3px;";
						b.innerHTML = "<span class='material-icons ico'>live_tv</span> twitch";
						a.appendChild(b);
						document.getElementById("dependButtons").appendChild(a);
					}
					// storefronts
					if (links[c].href.includes("https://www.teespring.com") | links[c].href.includes("https://teespring.com/")) {
						var a = document.createElement("A");
						a.href = links[c].href;
						var b = document.createElement("BUTTON");
						b.style = "margin:3px;";
						b.innerHTML = "<span class='material-icons ico'>storefront</span> teespring";
						a.appendChild(b);
						document.getElementById("dependButtons").appendChild(a);
					} else if (links[c].href.includes("https://store.spreadshirt.com")) {
						var a = document.createElement("A");
						a.href = links[c].href;
						var b = document.createElement("BUTTON");
						b.style = "margin:3px;";
						b.innerHTML = "<span class='material-icons ico'>storefront</span> spreadshirt";
						a.appendChild(b);
						document.getElementById("dependButtons").appendChild(a);
					} else if (links[c].href.includes("https://www.etsy.com") | links[c].href.includes("https://etsy.com")) {
						var a = document.createElement("A");
						a.href = links[c].href;
						var b = document.createElement("BUTTON");
						b.style = "margin:3px;";
						b.innerHTML = "<span class='material-icons ico'>storefront</span> etsy";
						a.appendChild(b);
						document.getElementById("dependButtons").appendChild(a);
					}
				}
			}
			document.getElementById("recentUploads").innerHTML = "";
			document.getElementById("recentUploads").style.display = "";
			document.getElementById("newUps").style.display = "";
			document.getElementById("chanLoader").style.display = 'none';
			document.getElementById("chanViewer").style.display = '';
			document.getElementById("searchContainer").style.display = '';
			document.getElementById("bannerPfpContainer").style.display = '';
			document.getElementById("relatedChannels").innerHTML = "";
			document.title = jsond.author + " | vidpolaris";
			if (jsond.latestVideos[0]){
				for (var c in jsond.latestVideos) {
					var link = document.createElement("A");
					link.href = "#w#" + jsond.latestVideos[c].videoId;
					link.id = "up" + c;
					document.getElementById("recentUploads").appendChild(link);
					var div = document.createElement("DIV");
					div.classList.add("altSmallVideo");
					div.id = "up" + c + "Div"
					document.getElementById("up"+c).appendChild(div);
					var img = document.createElement("IMG");
					img.classList.add("relatedThumb");
					img.src = "https://img.youtube.com/vi/" + jsond.latestVideos[c].videoId + "/hqdefault.jpg";
					document.getElementById("up"+c+"Div").appendChild(img);
					var h3 = document.createElement("H4");
					h3.classList.add("stat");
					h3.innerHTML = jsond.latestVideos[c].title;
					document.getElementById("up"+c+"Div").appendChild(h3);
					var stat1 = document.createElement("H5");
					stat1.innerHTML = '<span class="material-icons ico">calendar_today</span> posted ' + jsond.latestVideos[c].publishedText;
					stat1.classList.add("stat")
					document.getElementById("up"+c+"Div").appendChild(stat1);
					var stat2 = document.createElement("H5");
					stat2.innerHTML = '<span class="material-icons ico">remove_red_eye</span> ' + jsond.latestVideos[c].viewCount.toLocaleString() + ' views'
					stat2.classList.add("stat");
					document.getElementById("up"+c+"Div").appendChild(stat2);
				}
				for (c in jsond.relatedChannels) {
					var link = document.createElement("A");
					link.href = "#c#" + jsond.relatedChannels[c].authorId;
					link.id = "reCh" + c;
					document.getElementById("relatedChannels").appendChild(link);
					var div = document.createElement("DIV");
					div.classList.add("relatedChannel");
					div.id = "reChDiv" + c;
					document.getElementById("reCh"+c).appendChild(div);
					var img = document.createElement("IMG");
					var url = jsond.relatedChannels[c].authorThumbnails[0].url
					img.src = url.split('=s')[0];
					img.classList.add("profilePics");
					document.getElementById("reChDiv"+c).appendChild(img);
					var name = document.createElement("H2");
					name.innerHTML = jsond.relatedChannels[c].author;
					name.classList.add("stat");
					document.getElementById("reChDiv"+c).appendChild(name);
				}
				document.getElementById("newUps").style.display = "";
				document.getElementById("noUps").style.display = "none";
				document.getElementById("vidBtn").style.display = "";
				if (sessionStorage.getItem("noUploads")) {
					sessionStorage.removeItem("noUploads");
				}
			} else {
				for (c in jsond.relatedChannels) {
					var link = document.createElement("A");
					link.href = "#c#" + jsond.relatedChannels[c].authorId;
					link.id = "reCh" + c;
					document.getElementById("relatedChannels").appendChild(link);
					var div = document.createElement("DIV");
					div.classList.add("relatedChannel");
					div.id = "reChDiv" + c;
					document.getElementById("reCh"+c).appendChild(div);
					var img = document.createElement("IMG");
					var url = jsond.relatedChannels[c].authorThumbnails[0].url
					img.src = url.split('=s')[0];
					img.classList.add("profilePics");
					document.getElementById("reChDiv"+c).appendChild(img);
					var name = document.createElement("H2");
					name.innerHTML = jsond.relatedChannels[c].author;
					name.classList.add("stat");
					document.getElementById("reChDiv"+c).appendChild(name);
				}
				document.getElementById("newUps").style.display = "none";
				document.getElementById("noUps").style.display = "";
				document.getElementById("vidBtn").style.display = "none";
				sessionStorage.setItem("noUploads", "y");
			}
		}
	}
	http.timeout = 7000;
	http.ontimeout = () => {
		if (opt == "a" | !opt) {
			openChannel("b");
		} else if (opt == "b"){
			openChannel("c");
		} else if (opt == "c") {
			openChannel("a");
		}
	}
}

function openAbout() {
	document.getElementById("aboutPage").style.display = "";
	document.getElementById("newUps").style.display = "none";
	document.getElementById("noUps").style.display = "none";
	document.getElementById("allUploadsPage").style.display = "none";
	document.getElementById("recentUploads").style.display = "none";
}

function openChannelVideos(opt,pg) {
	document.getElementById("recentUploads").style.display = 'none';
	document.getElementById("allUploadsPage").style.display = '';
	document.getElementById("newUps").style.display = "none";
	document.getElementById("aboutPage").style.display = 'none';
	document.getElementById("pwChannel").style.display = '';
	const http = new XMLHttpRequest();
	if (!document.getElementById("pageNumChan").innerHTML | document.getElementById("pageNumChan").innerHTML == "i") {
		sessionStorage.setItem("nxtpg", "ii");
		document.getElementById("pageNumChan").innerHTML = "ii";
	} else {
		var curPage = document.getElementById("pageNumChan").innerHTML.length;
		var pageNum_b = document.getElementById("pageNumChan").innerHTML + "i";
		sessionStorage.setItem("nxtpg", pageNum_b);
		var pageNum = curPage;
		document.getElementById("pageNumChan").innerHTML = pageNum_b;
	}
	var id = getClickedId(window.location.href, '#c#');
	if (opt == "a" | !opt) {
		if (pg == "i" | !pg) {
			var url = "https://vidpolaris.ml:9019/?channelVideos=" + id + "&sortBy=" + document.getElementById("sortBy").value;
		} else {
			var url = "https://vidpolaris.ml:9019/?channelVideos=" + id + "&sortBy=" + document.getElementById("sortBy").value + "&page="+ pageNum;
		}
	} else if (opt == "b"){
		if (pg == "i" | !pg) {
			var url = "https://vidpolaris.herokuapp.com/?channelVideos=" + id + "&sortBy=" + document.getElementById("sortBy").value;
		} else {
			var url = "https://vidpolaris.herokuapp.com/?channelVideos=" + id + "&sortBy=" + document.getElementById("sortBy").value + "&page="+ pageNum;
		}
	} else if (opt == "c") {
		if (pg == "i" | !pg) {
			var url = "https://vidpolaris-europe.herokuapp.com/?channelVideos=" + id + "&sortBy=" + document.getElementById("sortBy").value;
		} else {
			var url = "https://vidpolaris-europe.herokuapp.com/?channelVideos=" + id + "&sortBy=" + document.getElementById("sortBy").value + "&page="+ pageNum;
		}
	}
	http.open("GET", url);
	http.send();
	http.onload=(e)=>{
		document.getElementById("allUploads").innerHTML = "";
		var jsond = JSON.parse(http.responseText);
		for (var c in jsond) {
			var link = document.createElement("A");
			link.href = "#w#" + jsond[c].videoId;
			link.id = "au" + c;
			document.getElementById("allUploads").appendChild(link);
			var div = document.createElement("DIV");
			div.classList.add("altSmallVideo");
			div.id = "au" + c + "Div"
			document.getElementById("au"+c).appendChild(div);
			var img = document.createElement("IMG");
			img.classList.add("relatedThumb");
			img.src = "https://img.youtube.com/vi/" + jsond[c].videoId + "/hqdefault.jpg";
			document.getElementById("au"+c+"Div").appendChild(img);
			var h3 = document.createElement("H4");
			h3.classList.add("stat");
			h3.innerHTML = jsond[c].title;
			document.getElementById("au"+c+"Div").appendChild(h3);
			var stat1 = document.createElement("H5");
			stat1.innerHTML = '<span class="material-icons ico">calendar_today</span> posted ' + jsond[c].publishedText;
			stat1.classList.add("stat")
			document.getElementById("au"+c+"Div").appendChild(stat1);
			var stat2 = document.createElement("H5");
			stat2.innerHTML = '<span class="material-icons ico">remove_red_eye</span> ' + jsond[c].viewCount.toLocaleString() + ' views'
			stat2.classList.add("stat");
			document.getElementById("au"+c+"Div").appendChild(stat2);
		}
		document.getElementById("pwChannel").style.display = 'none';
		if (jsond.length == 60) {
			document.getElementById("controls").style = "width:20%;float:left;margin:0;";
			document.getElementById("nextUpload").removeAttribute("disabled");
			document.getElementById("nextUpload").style.display = "";
		} else {
			document.getElementById("nextUpload").setAttribute("disabled", "true");
			document.getElementById("nextUpload").style.display = "none";
		}
	}
}

function cHome() {
	document.getElementById("recentUploads").style.display = '';
	if (!sessionStorage.getItem("noUploads")) {
		document.getElementById("newUps").style.display = "";
		document.getElementById("noUps").style.display = "none";
	} else {
		document.getElementById("newUps").style.display = "none";
		document.getElementById("noUps").style.display = "";
	}
	document.getElementById("allUploadsPage").style.display = 'none';
	document.getElementById("aboutPage").style.display = 'none';
}

function watchOnYoutube() {
	var id = getClickedId(window.location.href, "#w#");
	window.open("https://youtube.com/watch?v=" + id, "_self")
}

function watchOnNCYoutube() {
	var id = getClickedId(window.location.href, "#w#");
	window.open("https://www.youtube-nocookie.com/embed/" + id + "?autoplay=true", "_self")
}

function watchOnInvidious() {
	var id = getClickedId(window.location.href, "#w#");
	window.open("https://invidio.us/watch?v=" + id, "_self")
}

function setSpeed() {
	var speed = document.getElementById("speed").value;
	if (localStorage.getItem("smart") == "y") {
		var smart = true;
	} else {
		var smart = false;
	}
	if (speed == "p1x") {
		document.getElementById("player").playbackRate = 0.1;
		if (smart == true) {
			document.getElementById("audioPlayer").playbackRate = 0.1;
		}
	} else if (speed == "25x") {
		document.getElementById("player").playbackRate = 0.25;
		if (smart == true) {
			document.getElementById("audioPlayer").playbackRate = 0.25;
		}
	} else if (speed == "5x") {
		document.getElementById("player").playbackRate = 0.5;
		if (smart == true) {
			document.getElementById("audioPlayer").playbackRate = 0.5;
		}
	} else if (speed == "75x") {
		document.getElementById("player").playbackRate = 0.75;
		if (smart == true) {
			document.getElementById("audioPlayer").playbackRate = 0.75;
		}
	} else if (speed == "1x") {
		document.getElementById("player").playbackRate = 1.0;
		if (smart == true) {
			document.getElementById("audioPlayer").playbackRate = 1.0;
		}
	} else if (speed == "125x") {
		document.getElementById("player").playbackRate = 1.25;
		if (smart == true) {
			document.getElementById("audioPlayer").playbackRate = 1.25;
		}
	} else if (speed == "15x") {
		document.getElementById("player").playbackRate = 1.5;
		if (smart == true) {
			document.getElementById("audioPlayer").playbackRate = 1.5;
		}
	} else if (speed == "175x") {
		document.getElementById("player").playbackRate = 1.75;
		if (smart == true) {
			document.getElementById("audioPlayer").playbackRate = 1.75;
		}
	} else if (speed == "2x") {
		document.getElementById("player").playbackRate = 2.0;
		if (smart == true) {
			document.getElementById("audioPlayer").playbackRate = 2.0;
		}
	} else if (speed == "225x") {
		document.getElementById("player").playbackRate = 2.25;
		if (smart == true) {
			document.getElementById("audioPlayer").playbackRate = 2.25;
		}
	} else if (speed == "2p5x") {
		document.getElementById("player").playbackRate = 2.5;
		if (smart == true) {
			document.getElementById("audioPlayer").playbackRate = 2.5;
		}
	} else if (speed == "275x") {
		document.getElementById("player").playbackRate = 2.75;
		if (smart == true) {
			document.getElementById("audioPlayer").playbackRate = 2.75;
		}
	} else if (speed == "3x") {
		document.getElementById("player").playbackRate = 3.0;
		if (smart == true) {
			document.getElementById("audioPlayer").playbackRate = 3.0;
		}
	}
	localStorage.setItem("pbSpeed", document.getElementById("speed").value);
}

function suggest(opt) {
	if (document.getElementById("q").value == "" | localStorage.getItem("suggest") == "n") {
		document.getElementById("suggest").innerHTML = "";
		return;
	}
	var q = document.getElementById("q").value
	if (opt == "a" | !opt) {
		var url = "https://vidpolaris.ml:9019/?suggest=" + q;
	} else if (opt == "b"){
		var url = "https://vidpolaris.herokuapp.com/?suggest=" + q;
	} else if (opt == "c") {
		var url = "https://vidpolaris-europe.herokuapp.com/?suggest=" + q;
	}
	const http = new XMLHttpRequest();
	http.open("GET", url);
	http.send();
	http.onload=(e)=>{
		var jsond = JSON.parse(http.responseText);
		if (jsond.results[0]) {
			var opti = document.createElement("OPTION");
			opti.innerHTML = jsond.results[0];
			document.getElementById("suggest").innerHTML = "";
			document.getElementById("suggest").appendChild(opti);
			if (jsond.results[1]) {
				var opti = document.createElement("OPTION");
				opti.innerHTML = jsond.results[1];
				document.getElementById("suggest").appendChild(opti);
				if (jsond.results[2]) {
					var opti = document.createElement("OPTION");
					opti.innerHTML = jsond.results[2];
					document.getElementById("suggest").appendChild(opti);
					if (jsond.results[3]) {
						var opti = document.createElement("OPTION");
						opti.innerHTML = jsond.results[3];
						document.getElementById("suggest").appendChild(opti);
						if (jsond.results[4]) {
							var opti = document.createElement("OPTION");
							opti.innerHTML = jsond.results[4];
							document.getElementById("suggest").appendChild(opti);
						}
					}
				}
			}
		}
	}
}

function swap(intent) {
	if (intent == "over") {
		if (sessionStorage.getItem("total")) {
			document.getElementById("ldTail").innerHTML = " total";
			document.getElementById("ldRatio").innerHTML = sessionStorage.getItem("total");
		} else {
			return;
		}
	} else if (intent == "off") {
		if (sessionStorage.getItem("ratio")) {
			document.getElementById("ldTail").innerHTML = "% ratio";
			document.getElementById("ldRatio").innerHTML = sessionStorage.getItem("ratio");
		} else {
			return;
		}
	}
}

function embedNoCookie() {
	document.getElementById("playerContainer").style.display = "none";
	document.getElementById("player").pause();
	document.getElementById("embedContainer").style.display = "";
	document.getElementById("loadErr").style.display = "none";
	document.getElementById("theat_native").style.display = "none";
	document.getElementById("theat_embed").style.display = "";
	var iframe = document.createElement("IFRAME");
	iframe.src = "https://www.youtube-nocookie.com/embed/" + getClickedId(window.location.href, "#w#") + "/?autoplay=true";
	iframe.setAttribute("allowfullscreen", "true");
	iframe.style = "height:645px;width:60%";
	iframe.id = "frame";
	document.getElementById("embedContainer").appendChild(iframe);
	var p = document.createElement("P");
	p.innerHTML = "<b>certain</b> keyboard shortcuts do not work with embeds currently.";
	p.classList.add("stat");
	document.getElementById("embedPlayer").style.display = "none";
	document.getElementById("refreshBtn").style.display = "";
	document.getElementById("qSelector").style.display = "none";
	document.getElementById("speedSelector").style.display = "none";
	document.getElementById("embedContainer").appendChild(p);
}

function range(start, end) {
	return Array(end - start + 1).fill().map((_, idx) => start + idx)
}

function preset(d) {
	if (!d) {
		return;
	} else {
		if (d == "preformance") {
			document.getElementById("sq").value = "n";
			document.getElementById("suggest").value = "n";
			document.getElementById("autoComm").value = "n";
			document.getElementById("disableCards").value = "y";
			document.getElementById("showReddit").value = "n";
			document.getElementById("showSize").value = "n";
		} else if (d == "dataHeavy") {
			document.getElementById("sq").value = "y";
			document.getElementById("suggest").value = "y";
			document.getElementById("autoComm").value = "y";
			document.getElementById("disableCards").value = "n";
			document.getElementById("showReddit").value = "y";
			document.getElementById("showSize").value = "y";
		} else if (d == "default") {
			document.getElementById("sq").value = "y";
			document.getElementById("theme").value = "d_v1";
			document.getElementById("server").value = "a";
			document.getElementById("suggest").value = "y";
			document.getElementById("country").value = "us";
			document.getElementById("autoComm").value = "y";
			document.getElementById("disableCards").value = "n";
			document.getElementById("showReddit").value = "n";
			document.getElementById("showSize").value = "n";
			document.getElementById("aas").value = "y";
			document.getElementById("invIns").value = "o";
		}
	}
}

function rSearch(opt, f) {
	document.getElementById("redditBtn").style.display = "none";
	document.getElementById("rPosts").innerHTML = "";
	if (f == "y" | localStorage.getItem("showReddit") == "y") {
		var id = getClickedId(window.location.href, "#w#");
		if (opt == "a" | !opt) {
			var url = "https://vidpolaris.ml:9019/?redditSearch=" + id;
		} else if (opt == "b"){
			var url = "https://vidpolaris.herokuapp.com/?redditSearch=" + id;
		} else if (opt == "c") {
			var url = "https://vidpolaris-europe.herokuapp.com/?redditSearch=" + id;
		}
		const http = new XMLHttpRequest();
		http.open("GET", url);
		http.send();
		http.onload=(e)=>{
			document.getElementById("rPosts").innerHTML = "";
			var jsond = JSON.parse(http.responseText);
			if (jsond.err) {
				document.getElementById("redditBtn").style.display = "none";
				return;
			}
			var leng = jsond.length;
			if (leng <= 5) {
				document.getElementById("redditBtn").style.display = "none";
				for (var c in jsond) {
					var linkTP = document.createElement("A");
					linkTP.href = jsond[c].postLink;
					linkTP.classList.add("channelLink");
					linkTP.id = "rePoLi" + c;
					var div = document.createElement("DIV");
					div.classList.add("comment");
					div.id = "rePo" + c;
					var tit = document.createElement("H3");
					tit.innerHTML = jsond[c].postTitle;
					tit.classList.add("cText");
					tit.classList.add("stat");
					var stats = document.createElement("P");
					stats.innerHTML = jsond[c].postScore.toLocaleString() + " upvotes and " + jsond[c].postComNum.toLocaleString() + " comments • posted on /" + jsond[c].postSub + " by " + jsond[c].postAuthor;
					stats.classList.add("cText");
					stats.classList.add("stat");
					document.getElementById("rPosts").appendChild(linkTP);
					linkTP.appendChild(div);
					div.appendChild(tit);
					div.appendChild(stats);
				}
			} else {
				document.getElementById("redditBtn").style.display = "none";
				for (var c in jsond) {
					var linkTP = document.createElement("A");
					linkTP.href = jsond[c].postLink;
					linkTP.classList.add("channelLink");
					linkTP.id = "rePoLi" + c;
					var div = document.createElement("DIV");
					div.classList.add("comment");
					div.id = "rePo" + c;
					var tit = document.createElement("H3");
					tit.innerHTML = jsond[c].postTitle;
					tit.classList.add("cText");
					tit.classList.add("stat");
					var stats = document.createElement("P");
					stats.innerHTML = jsond[c].postScore.toLocaleString() + " upvotes and " + jsond[c].postComNum.toLocaleString() + " comments • posted on /" + jsond[c].postSub + " by " + jsond[c].postAuthor;
					stats.classList.add("cText");
					stats.classList.add("stat");
					if (c <= 4) {
						document.getElementById("rPosts").appendChild(linkTP);
						linkTP.appendChild(div);
						div.appendChild(tit);
						div.appendChild(stats);
					} else {
						if (!document.getElementById("rPostExt")) {
							var div2 = document.createElement("DIV");
							div2.id = "rPostExt";
							div2.style = "display:none;"
							document.getElementById("rPosts").appendChild(div2);
							var btn = document.createElement("BUTTON");
							btn.setAttribute("onclick", "document.getElementById('rPostExt').style.display='';this.style='display:none;'")
							btn.innerHTML = "show more";
							document.getElementById("rPosts").appendChild(btn);
						}
						linkTP.appendChild(div);
						div.appendChild(tit);
						div.appendChild(stats);
						document.getElementById("rPostExt").appendChild(linkTP);
					}
				}
			}
		}
	} else {
		document.getElementById("redditBtn").style.display = "";
	}
}

function formatBytes(bytes, decimals = 2) {
	if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function varLinks(text) {
	if (!text.includes("http://") & !text.includes("https://")) {
		return text;
	} else {
		replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
		if (localStorage.getItem("injectRedir") == "y" | !localStorage.getItem("injectRedir")) {
			return text.replace(replacePattern1, '<a href="#redir#$1" class="channelLink">$1</a>');
		} else {
			return text.replace(replacePattern1, '<a href="$1" class="channelLink">$1</a>');
		}
	}
}

function skipSponsors(opt) {
	if (localStorage.getItem("skipSponsors") == "y") {
		document.getElementById("redditBtn").style.display = "none";
		document.getElementById("rPosts").innerHTML = "";
		var id = getClickedId(window.location.href, "#w#");
		if (opt == "a" | !opt) {
			var url = "https://vidpolaris.ml:9019/?sponsors=" + id;
		} else if (opt == "b") {
			var url = "https://vidpolaris.herokuapp.com/?sponsors=" + id;
		} else if (opt == "c") {
			var url = "https://vidpolaris-europe.herokuapp.com/?sponsors=" + id;
		}
		const http = new XMLHttpRequest();
		http.open("GET", url);
		http.send();
		http.onload=(e)=>{
			var jsond = JSON.parse(http.responseText);
			if (!jsond.err) {
				if (jsond[0] && jsond[0].category == "sponsor") {
					var a = setInterval(function () {
						var ti = jsond[0].segment[0]
						if (document.getElementById("player").currentTime >= jsond[0].segment[0]) {
							document.getElementById("player").pause();
							document.getElementById("player").currentTime = jsond[0].segment[1];
							window.clearInterval(a);
							var aa = setTimeout(function() {
								if (document.getElementById("player").readyState >= 3 && document.getElementById("audioPlayer").readyState >=3) {
									document.getElementById("player").play();
									window.clearInterval(aa);
								}
							})
						}
					},10)
				}
				if (jsond[1] && jsond[1].category == "sponsor") {
					var b = setInterval(function () {
						var ti = jsond[1].segment[0]
						if (document.getElementById("player").currentTime >= jsond[1].segment[0]) {
							document.getElementById("player").pause();
							document.getElementById("player").currentTime = jsond[1].segment[1];
							window.clearInterval(b);
							var ba = setTimeout(function() {
								if (document.getElementById("player").readyState >= 3 && document.getElementById("audioPlayer").readyState >=3) {
									document.getElementById("player").play();
									window.clearInterval(ba);
								}
							})
						}
					},10)
				}
				if (jsond[2] && jsond[2].category == "sponsor") {
					var c = setInterval(function () {
						var ti = jsond[2].segment[0]
						if (document.getElementById("player").currentTime >= jsond[2].segment[0]) {
							document.getElementById("player").pause();
							document.getElementById("player").currentTime = jsond[2].segment[1];
							window.clearInterval(c);
							var ca = setTimeout(function() {
								if (document.getElementById("player").readyState >= 3 && document.getElementById("audioPlayer").readyState >=3) {
									document.getElementById("player").play();
									window.clearInterval(ca);
								}
							})
						}
					},10)
				}
				if (jsond[3] &&jsond[3].category == "sponsor") {
					var d = setInterval(function () {
						var ti = jsond[1].segment[0]
						if (document.getElementById("player").currentTime >= jsond[1].segment[0]) {
							document.getElementById("player").pause();
							document.getElementById("player").currentTime = jsond[1].segment[1];
							window.clearInterval(d);
							var da = setTimeout(function() {
								if (document.getElementById("player").readyState >= 3 && document.getElementById("audioPlayer").readyState >=3) {
									document.getElementById("player").play();
									window.clearInterval(da);
								}
							})
						}
					},10)
				}
				if (jsond[4] && jsond[4].category == "sponsor") {
					var e = setInterval(function () {
						var ti = jsond[1].segment[0]
						if (document.getElementById("player").currentTime >= jsond[1].segment[0]) {
							document.getElementById("player").pause();
							document.getElementById("player").currentTime = jsond[1].segment[1];
							window.clearInterval(e);
							var ea = setTimeout(function() {
								if (document.getElementById("player").readyState >= 3 && document.getElementById("audioPlayer").readyState >=3) {
									document.getElementById("player").play();
									window.clearInterval(ea);
								}
							})
						}
					},10)
				}
			}
		}
	} else {
		return;
	}
}

function skipTo(to,sub) {
	if (!sub) {
		document.getElementById("player").pause();
		document.getElementById("player").currentTime = parseInt(to);
		if (document.getElementById("audioPlayer").src) {
			document.getElementById("audioPlayer").load();
		}
	} 
}
