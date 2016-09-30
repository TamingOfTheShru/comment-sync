var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var commentsSchema = new Schema({
  	email: {
  		type: String
  	},
  	name :{
  		type: String
  	},
  	comments: {
  		type: String
  	}
}, {strict:false}, {timestamps: true });

module.exports = mongoose.model('Comments', commentsSchema);