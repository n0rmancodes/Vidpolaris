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
const need = require("needle");
const ytch = require('yt-channel-info');
const cheerio = require("cheerio");
let filter;
// built-in pkgs
const http = require("http");
const url = require("url");
const fs = require("fs");
// boot up
console.log("starting server...");
const version = "0.2 [ALPHA]";
const port = process.env.PORT || 3001;
const hostUrl = "https://beta.vidpolaris.ml/";
need.defaults({
	user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:78.0) Gecko/20100101 Firefox/78.0"
});
http.createServer(runServer).listen(port);
console.log("listening on port " + port + " | version " + version);
console.log("====================================================");
async function runServer(request, res) {
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
				if (error | !body) {
					var d = JSON.stringify({
						"err": "noTrending"
					})
					res.writeHead(404, {
						"Access-Control-Allow-Origin": "*",
						"Content-Type": "application/json"
					})
					res.end(d);
				} else {
					res.writeHead(200, {
						"Access-Control-Allow-Origin": "*",
						"Content-Type": "application/json"
					})
					res.end(JSON.stringify(body.body));
				}
			})
		} else if (path == "/api/reddit" | path == "/api/reddit/") {
			var sub = param.sub || "videos";
			redddit.topPosts(sub, function(err,res) {
				if (!err) {
					let dat = [];
					var json = res;
					for (var c in json) {
						if (!json[c].data.url | !json[c].data.url.includes("youtu")) {
							
						} else {
							if (json[c].data.media) {
								if (ytdl.validateURL(json[c].data.url)) {
									let data = {
										"title": json[c].data.media.oembed.title,
										"author": json[c].data.media.oembed.author_name,
										"id": ytdl.getURLVideoID(json[c].data.url),
										"originalUrl": json[c].data.url,
										"score": json[c].data.score
									}
									dat.push(data);
								}
							}
						}
					}
					res.writeHead(200, {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": "*"
					});
					res.end(JSON.stringify(dat));
				} else {
					var d = JSON.stringify({
						"err": "failedToScrape"
					})
					res.writeHead(404, {
						"Access-Control-Allow-Origin": "*",
						"Content-Type": "application/json"
					})
					res.end(d)
				}
			})
		} else if (path == "/api/info" | path == "/api/info/") {
			var id = param.id;
			var dUrl = param.url;
			if (!id && !dUrl) {
				var d = JSON.stringify({
					"err": "requiresMoreData"
				})
				res.writeHead(404, {
					"Access-Control-Allow-Origin": "*",
					"Content-Type": "application/json"
				})
				res.end(d)
			} else {
				if (param.id) {
					var i = param.id;
				} else {
					if (ytdl.validateURL(param.url)) {
						var i = ytdl.getURLVideoID(param.url);
					} else {
						var d = JSON.stringify({
							"err": "invalidData"
						})
						res.writeHead(404, {
							"Access-Control-Allow-Origin": "*",
							"Content-Type": "application/json"
						})
						res.end(d);
					}
				}
				let info = await ytdl(i);
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
					res.writeHead(200, {
						"Access-Control-Allow-Origin": "*",
						"Content-Type": "application/json"
					});
					res.end(d);
				})
				info.on("error", function(e) {
					var json = JSON.stringify ({
						"err":e.stack.split("Error: ")[1].split("\n")[0]
					})
					res.writeHead(200, {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": "*"
					});
					res.end(json);
				})
			}
		} else if (path == "/api/playlist" | path == "/api/playlist/"){
			var id = param.id;
			var pUrl = param.url;
			if (!id && !pUrl) {
				var d = JSON.stringify({
					"err": "requiresMoreData"
				})
				res.writeHead(404, {
					"Access-Control-Allow-Origin": "*",
					"Content-Type": "application/json"
				});
				res.end(d);
			} else {
				if (id) {
					var i = param.id;
				} else {
					var i = param.url;
				}
				if (param.limit) {
					var opt = {
						limit: 0
					}
				} else {
					var opt = {
						limit: param.limit
					}
				}
				ytpl(i, opt, function(err,result) {
					if (err) {
						var errTxt = err.stack.split("Error: ")[1].split("\n")[0];
						var d = JSON.stringify({
							"err": errTxt
						})
						res.writeHead(404, {
							"Access-Control-Allow-Origin": "*",
							"Content-Type": "application/json"
						});
						res.end(d);
					} else {
						var d = JSON.stringify(result);
						res.writeHead(200, {
							"Access-Control-Allow-Origin": "*",
							"Content-Type": "application/json"
						});
						res.end(d);
					}
				})
			}
		} else if (path == "/api/search" | path == "/api/search/") {
			var q = param.q;
			if (!q) {
				var d = JSON.stringify({
					"err": "requiresMoreData"
				})
				res.writeHead(404, {
					"Access-Control-Allow-Origin": "*",
					"Content-Type": "application/json"
				});
				res.end(d);
			} else {
				let data = await ytsr(q).then(function(searchResults) {
					var d = JSON.stringify(searchResults);
					res.writeHead(200, {
						"Access-Control-Allow-Origin": "*",
						"Content-Type": "application/json"
					});
					res.end(d);
				})
			}
		} else if (path == "/api/translate" | path == "/api/translate/") {
			if (!param.data) {
				var d = JSON.stringify({
					"err": "requiresMoreData"
				})
				res.writeHead(404, {
					"Access-Control-Allow-Origin": "*",
					"Content-Type": "application/json"
				});
				res.end(d);
			} else {
				var data = param.data;
				if (!param.to) {
					var lang = "en"
				} else {
					var lang = oUrl.query.to;
				}
				trans(data,{to:lang}).then(res => {
					if (!res) {
						res.writeHead(404, {
							"Content-Type": "application/json",
							"Access-Control-Allow-Origin": "*"
						})
						res.end(JSON.stringify({"err":"couldNotResolve"}));
						return;
					} else {
						var json = JSON.stringify({res})
						res.writeHead(200, {
							"Content-Type": "application/json",
							"Access-Control-Allow-Origin": "*"
						});
						res.end(json);
						return;
					}
				})
			} 
		} else if (path == "/api/itag" | path == "/api/itag/") {
			if (param.id) {
				var i = param.id;
			} else {
				if (ytdl.validateURL(param.url)) {
					var i = ytdl.getURLVideoId(param.url);
				} else {
					var d = JSON.stringify({
						"err": "invalidData"
					});
					res.writeHead(404, {
						"Access-Control-Allow-Origin": "*",
						"Content-Type": "application/json"
					})
					res.end(d);
				}
			}
			var itag = param.itag;
			let info = ytdl(i);
			info.on('info', function(info) {
				if (info.formats) {
					let d = JSON.stringify(ytdl.chooseFormat(info.formats, { quality: itag }));
					res.writeHead(200,{
						"Access-Control-Allow-Origin": "*",
						"Content-Type": "application/json"
					})
					res.end(d);
				} else {
					var d = JSON.stringify({
						"err":"noFormats"
					});
					res.writeHead(404,{
						"Access-Control-Allow-Origin": "*",
						"Content-Type": "application/json"
					})
					res.end(d);
				}
			})
			info.on('err',function(err) {
				let d = JSON.stringify({
					"err":err.stack.split("Error: ")[1].split("\n")[0]
				})
				res.writeHead(404,{
					"Access-Control-Allow-Origin": "*",
					"Content-Type": "application/json"
				})
				res.end(d);
			})
		} else if (path == "/api/reddit/search" | path == "/api/reddit/search/") {
			if (param.id) {
				if (param.id) {
					var q = param.id;
				} else {
					if (!ytdl.validateURL(param.url)) {
						var d = JSON.stringify({
							"err":"invalidData"
						});
						res.writeHead(404,{
							"Access-Control-Allow-Origin": "*",
							"Content-Type": "application/json"
						})
						res.end(d);
						return;
					} else {
						var q = ytdl.getURLVideoId(param.url);
					}
				}
				redddit.search("url:youtu.be/"+q, function(err,res) {
					if (res) {
						if (res[0]) {
							var d = JSON.stringify(res);
							res.writeHead(200,{
								"Access-Control-Allow-Origin": "*",
								"Content-Type": "application/json"
							})
							res.end(d);
						} else {
							var d = JSON.stringify({
								"err":"noResults"
							});
							res.writeHead(404,{
								"Access-Control-Allow-Origin": "*",
								"Content-Type": "application/json"
							})
							res.end(d);
						}
					} else {
						var d = JSON.stringify({
							"err":err.stack.split("Error: ")[1].split("\n")[0]
						});
						res.writeHead(200, {
							"Access-Control-Allow-Origin": "*",
							"Content-Type": "application/json"
						})
						res.end(d);
					}
				})
			} else {
				var d = JSON.stringify({
					"err": "requiresMoreData"
				})
				res.writeHead(404, {
					"Access-Control-Allow-Origin": "*",
					"Content-Type": "application/json"
				});
				res.end(d);
			}
		} else if (path == "/api/proxy" | path == "/api/proxy/") {
			if (param.url) {
				var d = Buffer.from(param.url,"base64").toString();
				need.get(d).pipe(res);
			}
		} else if (path == "/api/channel" | path == "/api/channel/") {
			if (param.id) {
				ytch.getChannelInfo(param.id).then((response) => {
					var d = JSON.stringify(response);
					res.writeHead(200, {
						"Access-Control-Allow-Origin": "*",
						"Content-Type": "application/json"
					});
					res.end(d);
				}).catch((err) => {
					var d = JSON.stringify({
						"err":err.stack.split("Error: ")[1].split("\n")[0]
					});
					res.writeHead(404, {
						"Access-Control-Allow-Origin": "*",
						"Content-Type": "application/json"
					})
					res.end(d);
				});
			} else {
				var d = JSON.stringify({
					"err": "requiresMoreData"
				})
				res.writeHead(404, {
					"Access-Control-Allow-Origin": "*",
					"Content-Type": "application/json"
				});
				res.end(d);
			}
		} else if (path == "/api/channel/videos" | path == "/api/channel/videos/") {
			if (param.id) {
				if (param.sortBy == "newest" | param.sortBy == "oldest" | param.sortBy == "popular") {
					ytch.getChannelVideos(param.id, param.sortBy).then((response) => {
						var d = JSON.stringify(response);
						res.writeHead(200, {
							"Access-Control-Allow-Origin": "*",
							"Content-Type": "application/json"
						});
						res.end(d);
					}).catch((err) => {
						var d = JSON.stringify({
							"err":err.stack.split("Error: ")[1].split("\n")[0]
						});
						res.writeHead(404, {
							"Access-Control-Allow-Origin": "*",
							"Content-Type": "application/json"
						})
						res.end(d);
					});
				} else {
					ytch.getChannelVideos(param.id).then((response) => {
						var d = JSON.stringify(response);
						res.writeHead(200, {
							"Access-Control-Allow-Origin": "*",
							"Content-Type": "application/json"
						});
						res.end(d);
					}).catch((err) => {
						var d = JSON.stringify({
							"err":err.stack.split("Error: ")[1].split("\n")[0]
						});
						res.writeHead(404, {
							"Access-Control-Allow-Origin": "*",
							"Content-Type": "application/json"
						})
						res.end(d);
					});
				}
			} else if (param.token) {
				ytch.getChannelVideosMore(param.token).then((response) => {
					var d = JSON.stringify(response);
					res.writeHead(200, {
						"Access-Control-Allow-Origin": "*",
						"Content-Type": "application/json"
					});
					res.end(d);
				}).catch((err) => {
					var d = JSON.stringify({
						"err":err.stack.split("Error: ")[1].split("\n")[0]
					});
					res.writeHead(404, {
						"Access-Control-Allow-Origin": "*",
						"Content-Type": "application/json"
					})
					res.end(d);
				});
			} else {
				var d = JSON.stringify({
					"err": "requiresMoreData"
				})
				res.writeHead(404, {
					"Access-Control-Allow-Origin": "*",
					"Content-Type": "application/json"
				});
				res.end(d);
			}
		} else if (path == "/api/instances" | path == "/api/instances/") {
			need("https://raw.githubusercontent.com/n0rmancodes/vidpolaris-rw/master/instances.json", function(err, resp, body) {
				if (body) {
					res.writeHead(200, {
						"Access-Control-Allow-Origin": "*",
						"Content-Type": "application/json"
					});
					res.end(body);
				}
			})
		} else if (path == "/api/oembed" | path == "/api/oembed/") {
			if (param.url) {
				if (param.url.includes("?")) {
					if (param.url.split("?")[0] == "/w") {
						need("https://www.youtube.com/oembed/?url=https://youtu.be/" + param.url.split("?")[1], function(err, resp, body) {
							var body = JSON.stringify({
								"author_url": body.author_url,
								"provider_name": "VidPolaris Beta",
								"version": version,
								"type": "video",
								"html": "<iframe src='https://beta.vidpolaris.ml/old/embed#" + param.url.split("?")[1] + "'></iframe>",
								"url": hostUrl + param.url,
								"author_name": body.author_name,
								"thumbnail_url": hostUrl + "api/proxy?url=" + Buffer.from(body.thumbnail_url).toString("base64"),
								"title": body.title
							})
							res.writeHead(200, {
								"Access-Control-Allow-Origin": "*",
								"Content-Type": "application/json"
							});
							res.end(body)
						})
					}
				}
			}
		} else {
			var d = JSON.stringify({
				"err": "invalidEndpoint",
				"version": version,
				"port": port,
				"type": "all"
			})
			res.writeHead(404, {
				"Access-Control-Allow-Origin": "*",
				"Content-Type": "application/json"
			})
			res.end(d);
		}
	} else {
		// web content
		fs.readFile("./web-content" + path, function(err,resp) {
			if (err) {
				if (err.code == "ENOENT") {
					fs.readFile("./errors/404.html", function(err,resp){
						if (err) {
							res.end(err.code)
						} else {
							res.writeHead(200, {
								"Access-Control-Allow-Origin": "*",
								"Content-Type": "text/html"
							})
							res.end(resp)
						}
					})
				} else if (err.code == "EISDIR") {
					fs.readFile("./web-content" + path + "/index.html", function(err,resp) {
						if (err) {
							if (err.code == "ENOENT") {
								fs.readFile("./errors/404.html", function(err,resp){
									if (err) {
										res.end(err.code)
									} else {
										res.writeHead(200, {
											"Access-Control-Allow-Origin": "*",
											"Content-Type": "text/html"
										})
										res.end(resp)
									}
								})
							}
						} else {
							var $ = cheerio.load(resp);
							$("#h").append("<link type='application/json+oembed' href='http://vidpolaris.ml:9027/api/oembed/?url=" + request.url + "'>");
							var resp = $.html();
							res.writeHead(200, {
								"Access-Control-Allow-Origin": "*",
								"Content-Type":"text/html"
							})
							res.end(resp);
						}
					})
				} else {
					console.log(err.code);
					res.end(err.code);
				}
			} else {
				if (path.includes(".")) {
					var fileType = path.split(".")[path.split.length-1];
					if (fileType == "js") {
						res.writeHead(200, {
							"Access-Control-Allow-Origin": "*",
							"Content-Type":"application/javascript"
						})
						res.end(resp);
					} else if (fileType == "css") {
						res.writeHead(200, {
							"Access-Control-Allow-Origin": "*",
							"Content-Type":"text/css"
						})
						res.end(resp);
					} else {
						res.writeHead(200, {
							"Access-Control-Allow-Origin": "*",
						})
						res.end(resp)
					}
				} else {
					var $ = cheerio.load(resp);
					$("#h").append("<link type='application/json+oembed' href='http://vidpolaris.ml:9027/api/oembed/?url=" + request.url + "'>");
					var resp = $.html();
					res.writeHead(200, {
						"Access-Control-Allow-Origin": "*",
						"Content-Type":"text/html"
					})
					res.end(resp);
				}
			}
		})
	}
}