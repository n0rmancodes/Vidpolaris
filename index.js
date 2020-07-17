console.log("====================================================");
console.log("vidpolarisRW - rewrite of vidpolaris");
console.log("defining packages...");
// installable pkgs
const ytdl = require("ytdl-core");
const ytsr = require("ytsr");
const ytpl = require("ytpl");
const trans = require("@vitalets/google-translate-api");
const ytsg = require("youtube-suggest");
const redddit = require("redddit");
const need = require("needle")
let filter;
// built-in pkgs
const http = require("http");
const url = require("url");
const fs = require("fs")
// boot up
console.log("starting server...");
const version = "0.1 [ALPHA]";
const port = process.env.PORT || 3000;
need.defaults({
	user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:78.0) Gecko/20100101 Firefox/78.0"
});
http.createServer(runServer).listen(port);
console.log("listening on port " + port + " | version " + version);
console.log("====================================================");
async function runServer(request, response) {
	const req = url.parse(request.url, true);
	const path = req.pathname;
	const param = req.query;
	if (path.includes("/api")) {
		// api endpoints
		if (path == "/api/trending" | path == "/api/trending/") {
			var inst = param.inst;
			var locale = param.locale;
			var type = param.type;
			if (inst) {
				if (inst == "official") {
					var r = "https://invidio.us/api/v1/trending";
				} else if (inst == "snopyta"){
					var r = "https://invidious.snopyta.org/api/v1/trending";
				} else if (inst == "13ad") {
					var r = "https://invidious.13ad.de/api/v1/trending";
				} else if (inst == "ggc") {
					var r = "https://invidious.ggc-project.de/api/v1/trending";
				} else {
					var r = "https://invidio.us/api/v1/trending";
				}
			} else {
				var r = "https://invidio.us/api/v1/trending";
			}
			if (locale) {
				var r = r + "?region=" + locale
			}
			if (type) {
				if (locale) {
					var r = r + "&type=" + type
				} else {
					var r = r + "?type=" + type
				}
			}
			need("get", r, function(error, body) {
				if (error | !body.body) {
					var d = JSON.stringify({
						"err": "noTrending"
					})
					response.writeHead(404, {
						"Access-Control-Allow-Origin": "*",
						"Content-Type": "application/json"
					})
					response.end(d);
				} else {
					response.writeHead(200, {
						"Access-Control-Allow-Origin": "*",
						"Content-Type": "application/json"
					})
					response.end(JSON.stringify(body.body));
				}
			})
		} else if (path == "/api/reddit" | path == "/api/reddit/") {
			var sub = param.sub || "videos";
			redddit.topPosts(sub, function(err,res) {
				if (!err) {
					let dat = [];
					var json = res;
					console.log(json)
					for (var c in json) {
						if (!json[c].data.url | !json[c].data.url.includes("youtu")) {
							
						} else {
							if (json[c].data.media) {
								let data = {
									"title": json[c].data.media.oembed.title,
									"author": json[c].data.media.oembed.author_name,
									"id": getVidId(json[c].data.url),
									"originalUrl": json[c].data.url,
									"score": json[c].data.score
								}
								dat.push(data)
							}
						}
					}
					response.writeHead(200, {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": "*"
					});
					response.end(JSON.stringify(dat));
				} else {
					var d = JSON.stringify({
						"err": "failedToScrape"
					})
					response.writeHead(404, {
						"Access-Control-Allow-Origin": "*",
						"Content-Type": "application/json"
					})
					response.end(d)
				}
			})
		} else if (path == "/api/info" | path == "/api/info/") {
			var id = param.id;
			var dUrl = param.url;
			if (!id && !dUrl) {
				var d = JSON.stringify({
					"err": "requiresMoreData"
				})
				response.writeHead(404, {
					"Access-Control-Allow-Origin": "*",
					"Content-Type": "application/json"
				})
				response.end(d)
			} else {
				if (param.id) {
					var i = param.id;
				} else {
					if (ytdl.validateURL(param.url)) {
						var i = ytdl.getURLVideoId(param.url);
					} else {
						var d = JSON.stringify({
							"err": "invalidData"
						})
						response.writeHead(404, {
							"Access-Control-Allow-Origin": "*",
							"Content-Type": "application/json"
						})
					}
				}
				let info = await ytdl("JWeJHN5P-E8");
				info.on('info', function(info) {
					let v = ytdl.filterFormats(info.formats, 'videoonly');
					let a = ytdl.filterFormats(info.formats, 'audioonly');
					let j = ytdl.filterFormats(info.formats, 'audioandvideo');
					var i = info.info;
					var d = JSON.stringify({
						"video": v,
						"audio": a,
						"joined": j,
						info
					})
					response.writeHead(200, {
						"Access-Control-Allow-Origin": "*",
						"Content-Type": "application/json"
					});
					response.end(d);
				})
				info.on("err", function(err) {
					var json = JSON.stringify ({
						"err":err.stack.split("Error: ")[1].split("\n")[0]
					})
					response.writeHead(200, {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": "*"
					});
					response.end(json);
				})
			}
		} else if (path == "/api/playlist" | path == "/api/playlist/"){
			var id = param.id;
			var pUrl = param.url;
			if (!id && !pUrl) {
				var d = JSON.stringify({
					"err": "requiresMoreData"
				})
				response.writeHead(404, {
					"Access-Control-Allow-Origin": "*",
					"Content-Type": "application/json"
				});
				response.end(d);
			} else {
				if (id) {
					var i = param.id;
				} else {
					var i = param.url;
				}
				var opt = {
					limit: 0
				}
				ytpl(i, opt, function(err,result) {
					if (err) {
						var errTxt = err.stack.split("Error: ")[1].split("\n")[0];
						var d = JSON.stringify({
							"err": errTxt
						})
						response.writeHead(404, {
							"Access-Control-Allow-Origin": "*",
							"Content-Type": "application/json"
						});
						response.end(d);
					} else {
						var d = JSON.stringify(result);
						response.writeHead(200, {
							"Access-Control-Allow-Origin": "*",
							"Content-Type": "application/json"
						});
						response.end(d);
					}
				})
			}
		} else if (path == "/api/search" | path == "/api/search/") {
			var q = param.q;
			if (!q) {
				var d = JSON.stringify({
					"err": "requiresMoreData"
				})
				response.writeHead(404, {
					"Access-Control-Allow-Origin": "*",
					"Content-Type": "application/json"
				});
				response.end(d);
			} else {
				var options = {
					limit:100
				}
				ytsr(q, options,function(err, searchResults) {
					var d = JSON.stringify(searchResults)
					response.writeHead(404, {
						"Access-Control-Allow-Origin": "*",
						"Content-Type": "application/json"
					});
					response.end(d);
				})
			}
		} else if (path == "/api/translate" | path == "/api/translate/") {
			if (!param.data) {
				var d = JSON.stringify({
					"err": "requiresMoreData"
				})
				response.writeHead(404, {
					"Access-Control-Allow-Origin": "*",
					"Content-Type": "application/json"
				});
				response.end(d);
			} else {
				var data = param.data;
				if (param.to) {
					var lang = param.to;
				} else {
					var lang = "en";
				}
				trans(data, {to: lang}, function(err,res) {
					var d = JSON.stringify(res);
					response.writeHead(200, {
						"Access-Control-Allow-Origin": "*",
						"Content-Type": "application/json"
					});
					response.end(d);
				})
			} 
		} else {
			var d = JSON.stringify({
				"version": version,
				"port": port
			})
			response.writeHead(404, {
				"Access-Control-Allow-Origin": "*",
				"Content-Type": "application/json"
			})
			response.end(d);
		}
	} else {
		// web content
		if (path == "/" | path == "/index.html") {
			fs.readFile("./web-content/index.html", function(err,res) {
				if (err) {
					console.log(err.code);
					response.end(err.code);
				} else {
					response.writeHead(200, {
						"Access-Control-Allow-Origin": "*"
					})
					response.end(res)
				}
			})
		} else {
			fs.readFile("./web-content" + path, function(err,res) {
				if (err) {
					if (err.code == "ENOENT") {
						response.end("404");
					} else {
						console.log(err.code);
						response.end(err.code);
					}
				} else {
					response.writeHead(200, {
						"Access-Control-Allow-Origin": "*"
					})
					response.end(res)
				}
			})
		}
	}
}
function getVidId(rUrl) {
	if (rUrl.includes("youtube.com/watch?v=") & rUrl.includes("https://")) {
		if (rUrl.includes("www.")) {
			return rUrl.substring(32,43)
		} else {
			if (rUrl.includes("m.youtube.com")) {
				return rUrl.substring(30,41)
			} else {
				return rUrl.substring(23,39)
			}
		}
	} else if (rUrl.includes("youtube.com/watch?v=") & rUrl.includes("http://")) {
		if (rUrl.includes("www.")) {
			return rUrl.substring(31,41)
		} else {
			if (rUrl.includes("m.youtube.com")) {
				return rUrl.substring(29,40)
			} else {
				return rUrl.substring(27,43)
			}
		}
	} else if (rUrl.includes("youtu.be")) {
		return rUrl.substring(17,28)
	}
}