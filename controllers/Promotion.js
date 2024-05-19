const Promotion = require('../models/Promotion');

// Create a promotion
exports.createPromotion = async (req, res) => {
    try {
        const { title, description, discount, validFrom, validTo, restaurant } = req.body;

        // Validate required fields
        if (!title || !description || !discount || !validFrom || !validTo || !restaurant) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        // Create new promotion
        const promotion = await Promotion.create({
            title,
            description,
            discount,
            validFrom,
            validTo,
            restaurant
        });

        res.status(201).json({ success: true, data: promotion });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to create promotion' });
    }
};

// Get all promotions
exports.getAllPromotions = async (req, res) => {
    try {
        const promotions = await Promotion.find().populate('restaurant');
        res.status(200).json({ success: true, data: promotions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to fetch promotions' });
    }
};

// Get promotion by ID
exports.getPromotionById = async (req, res) => {
    try {
        const promotion = await Promotion.findById(req.params.id).populate('restaurant');
        if (!promotion) {
            return res.status(404).json({ success: false, message: 'Promotion not found' });
        }
        res.status(200).json({ success: true, data: promotion });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to fetch promotion' });
    }
};

// Update a promotion
exports.updatePromotion = async (req, res) => {
    try {
        const { title, description, discount, validFrom, validTo } = req.body;

        // Validate required fields
        if (!title || !description || !discount || !validFrom || !validTo) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const updatedPromotion = await Promotion.findByIdAndUpdate(req.params.id, {
            title,
            description,
            discount,
            validFrom,
            validTo
        }, { new: true });

        if (!updatedPromotion) {
            return res.status(404).json({ success: false, message: 'Promotion not found' });
        }

        res.status(200).json({ success: true, data: updatedPromotion });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to update promotion' });
    }
};

// Delete a promotion
exports.deletePromotion = async (req, res) => {
    try {
        const deletedPromotion = await Promotion.findByIdAndDelete(req.params.id);
        if (!deletedPromotion) {
            return res.status(404).json({ success: false, message: 'Promotion not found' });
        }
        res.status(200).json({ success: true, message: 'Promotion deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to delete promotion' });
    }
};
