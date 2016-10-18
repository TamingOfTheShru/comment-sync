var Comments = require('mongoose').model('Comments');
var dmpmod = require('diff_match_patch');
var dmp = new dmpmod.diff_match_patch();

module.exports.saveData = function(req, res) {
    var comments = req.body.diff;
    var email = req.body.email;

    var commentsModel = new Comments(req.body);
    Comments.findOne({ email: email }, function(err, doc) {
        if (err) {
            console.log(err);
        } else if (doc == null) {
        	commentsModel.diff = "";
        	commentsModel.comments = comments;
            commentsModel.save(req.body, function(err) {
                if (err) {
                    console.log(err);
                }
            });
        } else {
        	console.log(doc);
        	var newComment = doc.comments + doc.diff;
            doc.update({ $set: { comments : newComment, diff: comments } }, function(err) {
                if (err) {
                    console.log(err);
                }
            });
        }
    });
}
