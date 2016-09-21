var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var commentsSchema = new Schema({
  	email: {
  		type: String,
  		required: true
  	},
  	comment: {
  		type: String
  	}
}, {timestamps: true });

module.exports = mongoose.model('Comments', commentsSchema);