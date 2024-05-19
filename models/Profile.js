//imort mongoose
const mongoose = require('mongoose');

//defining user schema
const profileSchema = new mongoose.Schema({
	gender: {
		type: String,
	},
	dateOfBirth: {
		type: String,
	},
}, 
    {timestamps:true}
) 


//export the mongoose model for schema
module.exports = mongoose.model("Profile",profileSchema);
