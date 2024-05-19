//imort mongoose
const mongoose = require('mongoose');

//defining user schema
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,        
    },
    contactNumber:{
        type:String,
        required:true,
        trim:true,        
    },
    email:{
        type:String,
        required:true,
        trim:true,            
    },
    password:{
        type:String,
        required:true,
        trim:true,        
    },
    confirmPassword:{
        type:String,
        required:true,
        trim:true,       
    },
    accountType:{
        type:String,
        enum:["Customer","Restaurant","Admin"]
    },
    token:{
        type:String,
    },
    resetPasswordExpires:{
        type:String
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile",
        required:true,
    } ,  
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],

}, 
    {timestamps:true}
) 


//export the mongoose model for schema
module.exports = mongoose.model("User",userSchema);
