console.log("====================================================");
console.log("vidpolarisRW - rewrite of vidpolaris");
console.log("defining packages...");
// installable pkgs
const ytdl = require("ytdl-core");
const ytsr = require("ytsr");
let filter;
const ytpl = require("ytpl");
const ytsg = require("youtube-suggest");
const redddit = require("redddit");
const ytch = require("yt-channel-info");
const CommentScraper = require("yt-comment-scraper");
const ytco = new CommentScraper();
const cheerio = require("cheerio");
const got = require("got");
const deez = require("deezer-public-api");
const deezer = new deez();
const trending = require("yt-trending-scraper");
// built-in pkgs
const http = require("http");
const url = require("url");
const fs = require("fs");
// boot up
console.log("starting server...");
const version = "0.3";
const version_type = "ALPHA"
const config = JSON.parse(fs.readFileSync("./config.json"));
const port = process.env.PORT || config.port;
const hostUrl = config.hostUrl;
http.createServer(runServer).listen(port);
console.log("listening on port " + port + " | version " + version + " [" + version_type + "]");
console.log("====================================================");
async function runServer(request, res) {
	const req = url.parse(request.url, true);
	const path = req.pathname;
	const param = req.query;
	if (path.includes("/api")) {
		// api endpoints
		if (path == "/api/trending" | path == "/api/trending/") {
			trending.scrape_trending_page().then(function(data) {
				res.writeHead(200, {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*"
				});
				res.end(JSON.stringify(data));
			}).catch(function(error) {
				var data = JSON.stringify({
					"err": error.message
				});
				res.writeHead(404, {
					"Access-Control-Allow-Origin": "*",
					"Content-Type": "application/json"
				})
				res.end(data)
			})
		} else if (path == "/api/reddit" | path == "/api/reddit/") {
			var sub = param.sub || "videos";
			redddit.topPosts(sub, function(err,resp) {
				if (!err) {
					let dat = [];
					var json = resp;
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
					if (ytdl.validateID(param.id)) {
						var i = param.id;
					} else {
						var d = JSON.stringify({
							"err": "invalidData"
						})
						res.writeHead(404, {
							"Access-Control-Allow-Origin": "*",
							"Content-Type": "application/json"
						})
						res.end(d);
						return;
					}
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
						return;
					}
				}
				let info = await ytdl(i);
				info.on('info', function(info) {
					let v = ytdl.filterFormats(info.formats, 'videoonly');
					let a = ytdl.filterFormats(info.formats, 'audioonly');
					let j = ytdl.filterFormats(info.formats, 'audioandvideo');
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
						"err":e.message
					})
					res.writeHead(200, {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": "*"
					});
					res.end(json);
				})
			}
		} else if (path == "/api/playlist" | path == "/api/playlist/") {
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
				ytpl(i, opt).then(playlist => {
					res.writeHead(200, {
						"Access-Control-Allow-Origin": "*",
						"Content-Type": "application/json"
					});
					res.end(JSON.stringify(playlist));
				}).catch(err => {
					console.error(err);
				}); 
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
				await ytsr(q).then(function(searchResults) {
					var d = JSON.stringify(searchResults);
					res.writeHead(200, {
						"Access-Control-Allow-Origin": "*",
						"Content-Type": "application/json"
					});
					res.end(d);
				})
			}
		} else if (path == "/api/itag" | path == "/api/itag/") {
			if (param.id) {
				if (ytdl.validateID(param.id)) {
					var i = param.id;
				} else {
					var d = JSON.stringify({
						"err": "invalidData"
					});
					res.writeHead(404, {
						"Access-Control-Allow-Origin": "*",
						"Content-Type": "application/json"
					})
					res.end(d);
					return;
				}
			} else {
				if (ytdl.validateURL(param.url)) {
					var i = ytdl.getURLVideoID(param.url);
				} else {
					var d = JSON.stringify({
						"err": "invalidData"
					});
					res.writeHead(404, {
						"Access-Control-Allow-Origin": "*",
						"Content-Type": "application/json"
					})
					res.end(d);
					return;
				}
			}
			var itag = param.itag;
			let inf = ytdl(i).on("info", function(info) {
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
			}).on("err", function(err) {
				let d = JSON.stringify({
					"err":err.message
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
						var q = ytdl.getURLVideoID(param.url);
					}
				}
				redddit.search("url:youtu.be/"+q, function(err,resp) {
					if (resp) {
						if (resp[0]) {
							var d = JSON.stringify(resp);
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
							"err":err.message
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
		} else if (path == "/api/deezer/charts" | path == "/api/deezer/charts/") {
			deezer.chart.tracks(100).then(function(response) {
				res.writeHead(200, {
					"Access-Control-Allow-Origin": "*",
					"Content-Type": "application/json"
				});
				res.end(JSON.stringify(response.data));
			}).catch((e) =>{
				var d = JSON.stringify({
					"err":e.message
				});
				res.writeHead(404, {
					"Access-Control-Allow-Origin": "*",
					"Content-Type": "application/json"
				})
				res.end(d);
			})
		} else if (path == "/api/deezer/search" | path == "/api/deezer/search/") {
			if (!param.q) {
				var d = JSON.stringify({
					"err": "requiresMoreData"
				})
				res.writeHead(404, {
					"Access-Control-Allow-Origin": "*",
					"Content-Type": "application/json"
				});
				res.end(d);
			} else {
				deezer.search(param.q).then(function(response) {
					res.writeHead(200, {
						"Access-Control-Allow-Origin": "*",
						"Content-Type": "application/json"
					});
					res.end(JSON.stringify(response.data));
				}).catch((e) =>{
					var d = JSON.stringify({
						"err":e.message
					});
					res.writeHead(404, {
						"Access-Control-Allow-Origin": "*",
						"Content-Type": "application/json"
					})
					res.end(d);
				})
			}
		} else if (path == "/api/deezer" | path == "/api/deezer/") {
			if (param.id) {
				if (param.type == "song") {
					deezer.track(param.id).then(function(response) {
						ytsr(response.title + " " + response.artist.name + " official audio").then(function(searchResults) {
							ytdl(searchResults.items[0].link).on("info",function(info) {
								var i = [];
								for (var c in info.formats) {
									if (info.formats[c].audioQuality && !info.formats[c].isHLS && !info.formats[c].isDashMPD) {
										var o = info.formats[c]; 
										i.push(o);
									}
								}
								res.writeHead(200, {
									"Access-Control-Allow-Origin": "*",
									"Content-Type": "application/json"
								});
								res.end(JSON.stringify({
									"deezer": response,
									"ytdl": i
								}));
							})
						})
					}).catch((err) =>{
						var d = JSON.stringify({
							"err":err.message
						});
						res.writeHead(404, {
							"Access-Control-Allow-Origin": "*",
							"Content-Type": "application/json"
						})
						res.end(d);
					})
				} else if (param.type == "artist") {
					deezer.artist(param.id).then(function(response) {
						deezer.artist.top(param.id, 100).then(function(resp2) {
							deezer.artist.albums(param.id, response.nb_album).then(function(resp3) {
								res.writeHead(200, {
									"Access-Control-Allow-Origin": "*",
									"Content-Type": "application/json"
								});
								res.end(JSON.stringify({
									"info":response,
									"topTracks":resp2.data,
									"albumList":resp3.data
								}));
							}).catch((e) =>{
								var d = JSON.stringify({
									"err":e.message
								});
								res.writeHead(404, {
									"Access-Control-Allow-Origin": "*",
									"Content-Type": "application/json"
								})
								res.end(d);
							})
						}).catch((e) =>{
							var d = JSON.stringify({
								"err":e.message
							});
							res.writeHead(404, {
								"Access-Control-Allow-Origin": "*",
								"Content-Type": "application/json"
							})
							res.end(d);
						})
					}).catch((e) =>{
						var d = JSON.stringify({
							"err":e.message
						});
						res.writeHead(404, {
							"Access-Control-Allow-Origin": "*",
							"Content-Type": "application/json"
						})
						res.end(d);
					})
				} else if (param.type == "album") {
					deezer.album(param.id).then(function(response) {
						res.writeHead(200, {
							"Access-Control-Allow-Origin": "*",
							"Content-Type": "application/json"
						});
						res.end(JSON.stringify(response))
					}).catch((e) =>{
						var d = JSON.stringify({
							"err":e.message
						});
						res.writeHead(404, {
							"Access-Control-Allow-Origin": "*",
							"Content-Type": "application/json"
						})
						res.end(d);
					})
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
			} else {
				var d = JSON.stringify({
					"err": "requiresMoreData"
				});
				res.writeHead(404, {
					"Access-Control-Allow-Origin": "*",
					"Content-Type": "application/json"
				})
				res.end(d);
			}
		} else if (path == "/api/proxy" | path == "/api/proxy/") {
			if (param.url) {
				var d = Buffer.from(param.url, "base64").toString();
				got.stream(d).on("error", function() {
					res.end();
				}).on("close", function() {
					res.end();
				}).pipe(res);
			} else {
				var d = JSON.stringify({
					"err": "noUrl"
				})
				res.writeHead(404, {
					"Access-Control-Allow-Origin": "*",
					"Content-Type": "application/json"
				});
				res.end(d);
			}
		} else if (path == "/api/channel" | path == "/api/channel/") {
			if (param.id) {
				ytch.getChannelInfo(param.id).then((response) => {
					// i cant stop partyin partying 
					var d = JSON.stringify(response);
					res.writeHead(200, {
						"Access-Control-Allow-Origin": "*",
						"Content-Type": "application/json"
					});
					res.end(d);
				}).catch((err) => {
					var d = JSON.stringify({
						"err":err.message
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
							"err":err.message
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
							"err":err.message
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
						"err":err.message
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
			got("https://raw.githubusercontent.com/n0rmancodes/vidpolaris-rw/master/instances.json").then(function(response) {
				if (response.body) {
					res.writeHead(200, {
						"Access-Control-Allow-Origin": "*",
						"Content-Type": "application/json"
					});
					res.end(response.body);
				}
			}).catch(function(e) {
				var d = JSON.stringify({
					"err": e.message
				})
				res.writeHead(404, {
					"Access-Control-Allow-Origin": "*",
					"Content-Type": "application/json"
				});
				res.end(d);
			})
		} else if (path == "/api/oembed" | path == "/api/oembed/") {
			if (param.url && param.url.includes("?")) {
				if (param.url.split("?")[0] == "/watch" | param.url.split("?")[0] == "watch") {
					if (hostUrl == "https://beta.vidpolaris.tube/") {
						var hUrl = "http://vidpolaris.tube:9027/";
					} else {
						var hUrl = hostUrl;
					}
					got("https://www.youtube.com/oembed/?url=https://youtu.be/" + param.url.split("?v=")[1]).then(function(response) {
						var body = JSON.parse(response.body);
						var body = JSON.stringify({
							"author_url": body.author_url,
							"provider_name": "VidPolaris Beta",
							"provider_url": hostUrl,
							"version": version,
							"type": "video",
							"html": '<iframe width=\"480\" height=\"270\" src=\"' + hostUrl + 'old/embed/#w#' + param.url.split("?")[1] +  '\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>',
							"url": hostUrl + param.url.substring(1),
							"author_name": body.author_name,
							"thumbnail_url": hUrl + "api/thumb/" + param.url.split("?")[1],
							"title": body.title,
							"width": 480,
							"height": 270,
							"thumbnail_width":480,
							"thumbnail_height":270
						})
						res.writeHead(200, {
							"Access-Control-Allow-Origin": "*",
							"Content-Type": "application/json"
						});
						res.end(body)
					}).catch(function(e) {
						var d = JSON.stringify({
							"err": e.message
						})
						res.writeHead(404, {
							"Access-Control-Allow-Origin": "*",
							"Content-Type": "application/json"
						});
						res.end(d);
					})
				}
			}
		} else if (path.includes("/api/thumb")) {
			if (!path.split("/api/thumb")[1]) {
				var d = fs.createReadStream("./web-content/undefined.jpg");
				d.pipe(res);
				return;
			}
			if (path.split("/api/thumb/")[1].split("/")[0]) {
				var id = path.split("/api/thumb/")[1];
				var d = got.stream("https://i.ytimg.com/vi/" + id + "/hqdefault.jpg", {
					headers: {
						"Accept": "image/webp, */*",
						"Accept-Encoding": "gzip, deflate",
						"Accept-Language": "en-US,en;q=0.5",
						"Cache-Control": "max-age=0",
						"Connection": "keep-alive",
						"DNT": "1",
						"Referer": "https://youtube.com/",
						"Host": "i.ytimg.com",
						"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:79.0) Gecko/20100101 Firefox/79.0"
					}
				}).on("error", function(e) {
					res.end();
				}).on("close", function() {
					res.end();
				})
				d.pipe(res).on("close", function() {
					res.end();
				});
			} else {
				var d = fs.createReadStream("./web-content/undefined.jpg");
				d.pipe(res);
				return;
			}
		} else if (path == "/api/suggest" | path == "/api/suggest/") {
			if (param.q) {
				ytsg(param.q).then(function(results) {
					var d = JSON.stringify({results})
					res.writeHead(200, {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": "*"
					});
					res.end(d);
					return;
				}).catch((err) => {
					var d = JSON.stringify({
						"err":err.message
					});
					res.writeHead(404, {
						"Access-Control-Allow-Origin": "*",
						"Content-Type": "application/json"
					})
					res.end(d);
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
		} else if (path == "/api/sponsors" | path == "/api/sponsors/") {
			if (param.id) {
			 	got("https://sponsor.ajay.app/api/skipSegments?videoID=" + param.id).then(function(resp) {
					res.writeHead(resp.statusCode, resp.headers);
					res.end(JSON.stringify(resp.body));
				}).catch(function(e) {
					var d = JSON.stringify({
						"err": e.message
					})
					res.writeHead(404, {
						"Access-Control-Allow-Origin": "*",
						"Content-Type": "application/json"
					});
					res.end(d);
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
		} else if (path == "/api/comments" | path == "/api/comments/") {
			if (!param.id) {
				var d = JSON.stringify({
					"err": "requiresMoreData"
				})
				res.writeHead(404, {
					"Access-Control-Allow-Origin": "*",
					"Content-Type": "application/json"
				});
				res.end(d);
				return;
			} 
			ytco.scrape_next_page_youtube_comments(param.id).then(function(d) {
				var d = JSON.stringify(d);
				res.writeHead(200, {
					"Access-Control-Allow-Origin": "*",
					"Content-Type": "application/json"
				});
				res.end(d);
			}).catch(function(e) {
				var d = JSON.stringify({
					"err": e.message
				})
				res.writeHead(404, {
					"Access-Control-Allow-Origin": "*",
					"Content-Type": "application/json"
				});
				res.end(d);
			})
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
							res.writeHead(404, {
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
										res.writeHead(404, {
											"Access-Control-Allow-Origin": "*",
											"Content-Type": "text/html"
										})
										res.end(resp)
									}
								})
							}
						} else {
							var $ = cheerio.load(resp);
							$("#h").append("<link type='application/json+oembed' href='http://vidpolaris.tube:9027/api/oembed/?url=" + request.url + "'>");
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
					$("#h").append("<link type='application/json+oembed' href='http://vidpolaris.tube:9027/api/oembed/?url=" + request.url + "'>");
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