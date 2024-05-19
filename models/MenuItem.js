const mongoose = require('mongoose')

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    image:{
        type:String,
    },
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }], 
},
    {timestamps:true}
)

module.exports = mongoose.model("MenuItem",menuItemSchema)