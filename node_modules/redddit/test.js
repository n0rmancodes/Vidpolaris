const redddit = require('./index.js');
redddit.topPosts("videos",function(err,res){
	if (err !== null) {
		console.log(err.code)
	} else {
		var post = res[0].data.permalink;
		redddit.getPost(post, function(err,res) {
			console.log(res.comments)
		})
	}
});