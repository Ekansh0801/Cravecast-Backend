const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true,
    },
    deliveryPerson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    deliveryStatus: {
        type: String,
        enum: ["Pending", "Out for delivery", "Delivered"],
        default: "Pending",
    },
    estimatedDeliveryTime: {
        type: Date,
    },
    actualDeliveryTime: {
        type: Date,
    },
    deliveryAddress: {
        type: String,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "MenuItem",
        required: true,
    }],
    orderBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    orderTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true,
    },
    orderStatus: {
        type: String,
        enum: ["Pending", "Delivered", "Confirmed"],
    },
    deliveryNotes: {
        type: String,
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("Order",orderSchema);