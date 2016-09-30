var Comments = require('mongoose').model('Comments');

module.exports.getData = function(req, res){
	var email = req.body.email;
	var name = req.body.name;
	var comments = req.body.comments;

	var commentsModel = new Comments({'comments': comments});
	console.log(commentsModel);
	commentsModel.save(function(err){
		if (err){
			console.log(err);
		}
		else{
			console.log("Saved!");
		}
	})
}