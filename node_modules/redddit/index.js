const needle = require('needle');
exports.topPosts = (sub,cb) => {
	if (!sub) {
		var sub = "all";
	}
	var opt = { headers: {
		"Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
		"Accept-Encoding":"gzip, deflate, br",
		"Connection":"keep-alive",
		"DNT":"1",
		"Host":"www.reddit.com",
		"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:78.0) Gecko/20100101 Firefox/78.0",
	}}
	needle.get("https://reddit.com/r/"+sub+"/top.json?limit=100",opt,async function(err,resp,body) {
		if (err) {
			var body = null;
			cb(err,body);
		} else {
			var err = null;
			var res = body.data.children;
			cb(err,res);
		}
	})
}

exports.getPost = (post,cb) => {
	if (!post) {
		console.error("post param required");
		return false;
	}
	var opt = { headers: {
		"Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
		"Accept-Encoding":"gzip, deflate, br",
		"Connection":"keep-alive",
		"DNT":"1",
		"Host":"www.reddit.com",
		"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:78.0) Gecko/20100101 Firefox/78.0",
	}}
	needle.get("https://reddit.com"+post+".json",opt,async function(err,resp,body) {
		if (err) {
			var body = null;
			cb(err,body);
		} else {
			var err = null;
			var res = JSON.parse(JSON.stringify({
				"post": body[0].data.children[0],
				"comments": body[1].data.children
			}))
			cb(err,res);
		}
	})
}

exports.search = (query,cb) => {
	if (!query) {
		console.error("query param required");
		return false;
	}
	var opt = { headers: {
		"Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
		"Accept-Encoding":"gzip, deflate, br",
		"Connection":"keep-alive",
		"DNT":"1",
		"Host":"www.reddit.com",
		"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:78.0) Gecko/20100101 Firefox/78.0",
	}}
	needle.get("https://reddit.com/search.json?q="+encodeURI(query)+"&limit=100",opt,async function(err,resp,body) {
		if (err) {
			var body = null;
			cb(err,body);
		} else {
			var err = null;
			var res = body.data.children;
			cb(err,res)
		}
	})
}