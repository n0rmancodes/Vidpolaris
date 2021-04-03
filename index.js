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
const ytco = require("yt-comment-scraper");
const got = require("got");
const trending = require("yt-trending-scraper");
// built-in pkgs
const http = require("http");
const url = require("url");
const fs = require("fs");
// boot up
console.log("starting server...");
const version = "0.3";
const version_type = "ALPHA"
const config = JSON.parse(fs.readFileSync(__dirname + "/config.json"));
const port = process.env.PORT || config.port;
const hostUrl = config.hostUrl;
http.createServer(runServer).listen(port);
console.log("listening on port " + port + " | version " + version + " [" + version_type + "]");
console.log("====================================================");
async function runServer(request, res) {
	const req = url.parse(request.url, true);
	const path = req.pathname;
	const param = req.query;
	if (path.startsWith("/api")) {
		// api endpoints
		var pathClean = path.split("/").slice(1);
		switch (pathClean[1]) {
			case "trending":
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
			return;
			
			case "reddit":
				if (!pathClean[2]) {
					var sub = param.sub || "videos";
					redddit.topPosts(sub, function(err,resp) {
						if (!err) {
							let dat = [];
							var json = resp;
							for (var c in json) {
								if (!json[c].data.url | !json[c].data.url.includes("youtu")) {
									continue;
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
							});
							res.writeHead(404, {
								"Access-Control-Allow-Origin": "*",
								"Content-Type": "application/json"
							})
							res.end(d);
						}
					});
				} else if (pathClean[2] == "search") {
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
				}
			return;
			
			case "info":
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
						let s = {err: "No subtitles"}
						if (info
						.player_response.captions != undefined) {
									s = info
									.player_response.captions
									.playerCaptionsTracklistRenderer.captionTracks
						}
						let j = ytdl.filterFormats(info.formats, 'audioandvideo');
						var d = JSON.stringify({
							"video": v,
							"audio": a,
							"subtitles": s,
							"joined": j,
							info
						})
						res.writeHead(200, {
							"Access-Control-Allow-Origin": "*",
							"Content-Type": "application/json"
						});
						res.end(d);
						return;
					});
					info.on("error", function(e) {
						var json = JSON.stringify ({
							"err":e.message
						})
						res.writeHead(200, {
							"Content-Type": "application/json",
							"Access-Control-Allow-Origin": "*"
						});
						res.end(json);
						return;
					});
				}
			return;

			case "playlist":
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
							limit: Infinity
						}
					} else {
						var opt = {
							limit: param.limit
						}
					}
					ytpl(i, opt).then(function(playlist) {
						res.writeHead(200, {
							"Access-Control-Allow-Origin": "*",
							"Content-Type": "application/json"
						});
						res.end(JSON.stringify(playlist));
					}).catch(function (err) {
						res.writeHead(500, {
							"Access-Control-Allow-Origin": "*",
							"Content-Type": "application/json"
						});
						res.end(JSON.stringify({
							"err": err.message
						}));
					});
				}
			return;

			case "search":
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
					if (!param.src | param.src == "youtube") {
						await ytsr(q).then(function(searchResults) {
							var d = JSON.stringify(searchResults);
							res.writeHead(200, {
								"Access-Control-Allow-Origin": "*",
								"Content-Type": "application/json"
							});
							res.end(d);
						}).catch(function(e) {
							var d = JSON.stringify({
								"err":e.message
							});
							res.writeHead(500, {
								"Access-Control-Allow-Origin": "*",
								"Content-Type": "application/json"
							});
							res.end(d);
						})
					} else if (param.src == "reddit") {
						redddit.search("url:youtu.be/ " + q, function(err, json) {
							if (err) {
								var d = JSON.stringify({
									"err": err
								});
								res.writeHead(500, {
									"Access-Control-Allow-Origin": "*",
									"Content-Type": "application/json"
								});
								res.end(d);
							} else {
								let embed = [];
								for (var c in json) {
									if (json[c].data && json[c].data.media && json[c].data.media.oembed && ytdl.validateURL(json[c].data.url)) {
										var d = {
											"author": json[c].data.media.oembed.author_name || null,
											"authorUrl" : json[c].data.media.oembed.author_url,
											"title": json[c].data.media.oembed.title,
											"upvoteCount": json[c].data.ups,
											"subreddit": json[c].data.subreddit_name_prefixed,
											"id": ytdl.getURLVideoID(json[c].data.url)
										}
										embed.push(d)
									}
								}
								var d = JSON.stringify(embed);
								res.writeHead(200, {
									"Access-Control-Allow-Origin": "*",
									"Content-Type": "application/json"
								});
								res.end(d);
							}
						});
					}
				}
			return;

			case "itag":
				if (param.id || param.itag) {
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
				ytdl(i).on("info", function(info) {
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
				});
			return;

			case "proxy":
				if (param.url) {
					var d = Buffer.from(param.url, "base64").toString();
					try {
						got.stream(d).on("error", function() {
							res.end();
						}).on("close", function() {
							res.end();
						}).pipe(res);
					} catch (error) {
						res.end(error.message);
					}
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
			return;

			case "channel":
				if (!pathClean[2]) {
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
				} else if (pathClean[2] == "videos") {
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
				}
			return;

			case "thumb":
				if (!path.split("/api/thumb")[1]) {
					var d = fs.createReadStream(__dirname + "/web-content/undefined.jpg");
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
						var i = fs.readFileSync(__dirname + "/web-content/undefined.jpg");
						res.end(i);
						return;
					}).on("close", function() {
						res.end();
					})
					d.pipe(res).on("close", function() {
						res.end();
					});
				} else {
					var d = fs.createReadStream(__dirname + "/web-content/undefined.jpg");
					d.pipe(res);
					return;
				}
			return;

			case "suggest":
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
			return;

			case "sponsors":
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
			return;

			case "comments":
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
				if (param.continuation) {
					var payload = {
						videoId: param.id,
						continuation: param.continuation
					};
				} else {
					var payload = {
						videoId: param.id
					};
				}
				
				ytco.getComments(payload).then(function(d) {
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
			return;

			default:
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
			return;
		}
	} else if (path.substring(0,7) == "/embed/") {
		fs.readFile(__dirname + "/embed/index.html", function(err, resp) {
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
	} else {
		// web content
		fs.readFile(__dirname + "/web-content" + path, function(err,resp) {
			if (err) {
				if (err.code == "ENOENT") {
					fs.readFile(__dirname + "/errors/404.html", function(err,resp){
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
					fs.readFile(__dirname + "/web-content" + path + "/index.html", function(err,resp) {
						if (err) {
							if (err.code == "ENOENT") {
								fs.readFile(__dirname + "/errors/404.html", function(err,resp){
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
							res.writeHead(200, {
								"Access-Control-Allow-Origin": "*",
								"Content-Type":"text/html"
							})
							res.end(resp);
						}
					})
				} else {

				}
			} else {
				if (path.includes(".")) {
					var fileType = path.split(".")[path.split(".").length - 1];
					switch (fileType) {
						case "css":
							res.writeHead(200, {
								"Access-Control-Allow-Origin": "*",
								"Content-Type": "text/css"
							});
							res.end(resp);
						return;
						case "js":
							res.writeHead(200, {
								"Access-Control-Allow-Origin": "*",
								"Content-Type": "application/javascript"
							});
							res.end(resp);
						return;
						case "html":
							res.writeHead(200, {
								"Access-Control-Allow-Origin": "*",
								"Content-Type": "text/html"
							});
							res.end(resp);
						return;
						case "jpg":
							res.writeHead(200, {
								"Access-Control-Allow-Origin": "*",
								"Content-Type": "image/jpeg"
							});
							res.end(resp);
						return;
						case "png":
							res.writeHead(200, {
								"Access-Control-Allow-Origin": "*",
								"Content-Type": "image/png"
							});
							res.end(resp);
						return;
						case "gif":
							res.writeHead(200, {
								"Access-Control-Allow-Origin": "*",
								"Content-Type": "image/gif"
							});
							res.end(resp);
						return;
					}
				} else {
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
