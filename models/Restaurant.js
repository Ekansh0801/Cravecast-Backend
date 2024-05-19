const mongoose = require('mongoose')

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    contactNumber: {
        type: String,
        required: true,
        trim: true
    },
    openingHours: {
        type: String,
        // required: true
    },
    promotions:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Promotion",
        }
    ],
    menuItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MenuItem'
    }],
    image:[{
        type:String,
    }]
},
   {timestamps:true}
)

module.exports = mongoose.model("Restaurant",restaurantSchema);