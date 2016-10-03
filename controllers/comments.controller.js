var Comments = require('mongoose').model('Comments');
var dmpmod = require('diff_match_patch');
var dmp = new dmpmod.diff_match_patch();

module.exports.saveData = function(req, res){
	var comments = req.body.comments;
	var email = req.body.email;

	var commentsModel = new Comments(req.body);
	Comments.findOne({email: email}, function(err, doc){
		if(err){
			console.log(err);
		}
		else if (doc == null){
			commentsModel.save(req.body, function(err){
				if(err){
					console.log(err);
				}
			});
		}
		else{
			console.log("Old " + doc.comments);
			console.log("New " + comments);
			var diffs = dmp.diff_main(doc.comments, comments);
			console.log(diffs);
			dmp.diff_cleanupSemantic(diffs);
			var value = "";
			console.log("Diffs " + diffs);
			diffs.forEach(function(diff){
  				if (diff[0] != 0) {
					console.log(diff[0] + " " + diff[1]);
					value = value + " " + diff[1];
				}
			});
			doc.update({$set : {diff: value}}, function(err){
				if(err){
					console.log(err);
				}
			});
		}
	});
}	