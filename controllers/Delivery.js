const Order = require('../models/Order');

// Assign a delivery person to an order
exports.assignDeliveryPerson = async (req, res) => {
    try {
        const { orderId, deliveryPersonId } = req.body;

        // Validate required fields
        if (!orderId || !deliveryPersonId) {
            return res.status(400).json({ success: false, message: 'Order ID and delivery person ID are required' });
        }

        // Update order with assigned delivery person
        const updatedOrder = await Order.findByIdAndUpdate(orderId, { deliveryPerson: deliveryPersonId }, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        res.status(200).json({ success: true, data: updatedOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to assign delivery person' });
    }
};

// Get all orders assigned to a delivery person
exports.getDeliveryPersonOrders = async (req, res) => {
    try {
        const deliveryPersonId = req.params.id;

        // Find orders assigned to the delivery person
        const orders = await Order.find({ deliveryPerson: deliveryPersonId });

        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to fetch delivery person orders' });
    }
};

// Update order status (e.g., "Out for delivery", "Delivered")
exports.updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        // Validate required fields
        if (!orderId || !status) {
            return res.status(400).json({ success: false, message: 'Order ID and status are required' });
        }

        // Update order status
        const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        res.status(200).json({ success: true, data: updatedOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to update order status' });
    }
};
