const Order = require('../models/Order');
const Notification = require('../models/Notification');

// Create a new notification for order
exports.createOrderNotification = async (req, res) => {
    try {
        const { orderId, message } = req.body;

        // Validate required fields
        if (!orderId || !message) {
            return res.status(400).json({ success: false, message: 'Order ID and message are required' });
        }

        // Create a new notification entry
        const newNotification = await Notification.create({ orderId, message });

        res.status(201).json({ success: true, data: newNotification });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to create order notification' });
    }
};

// Get all notifications
exports.getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find();

        res.status(200).json({ success: true, data: notifications });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to fetch notifications' });
    }
};

// Get notification details by ID
exports.getNotificationById = async (req, res) => {
    try {
        const notificationId = req.params.id;

        const notification = await Notification.findById(notificationId);

        if (!notification) {
            return res.status(404).json({ success: false, message: 'Notification not found' });
        }

        res.status(200).json({ success: true, data: notification });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to fetch notification details' });
    }
};

// Delete a notification
exports.deleteNotification = async (req, res) => {
    try {
        const notificationId = req.params.id;

        const deletedNotification = await Notification.findByIdAndDelete(notificationId);

        if (!deletedNotification) {
            return res.status(404).json({ success: false, message: 'Notification not found' });
        }

        res.status(200).json({ success: true, message: 'Notification deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to delete notification' });
    }
};
