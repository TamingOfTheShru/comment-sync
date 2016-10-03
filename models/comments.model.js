var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var commentsSchema = new Schema({
  	email: {
  		type: String
  	},
  	comments: {
  		type: String
  	},
  	diff :{
  		type: String
  	}
}, {strict:false}, {timestamps: true });

module.exports = mongoose.model('Comments', commentsSchema);