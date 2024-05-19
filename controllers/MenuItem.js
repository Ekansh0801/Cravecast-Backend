const MenuItem = require('../models/MenuItem');

// Create Menu Item
exports.createMenuItem = async (req, res) => {
    try {
        // Extract data from request body
        const { name, description, price, category } = req.body;

        // Validate required fields
        if (!name || !price || !category) {
            return res.status(400).json({
                success: false,
                message: 'Name, price, and category are required fields'
            });
        }

        // Create new menu item
        const menuItem = await MenuItem.create({
            name,
            description,
            price,
            category
        });

        return res.status(201).json({
            success: true,
            message: 'Menu item created successfully',
            data: menuItem
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Error creating menu item',
            error: error.message
        });
    }
};

// Read Menu Items
exports.getAllMenuItems = async (req, res) => {
    try {
        // Fetch all menu items
        const menuItems = await MenuItem.find();

        return res.status(200).json({
            success: true,
            data: menuItems
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Error retrieving menu items',
            error: error.message
        });
    }
};

exports.getMenuItemById = async (req, res) => {
    try {
        const { id } = req.params;

        // Find menu item by ID
        const menuItem = await MenuItem.findById(id);

        if (!menuItem) {
            return res.status(404).json({
                success: false,
                message: 'Menu item not found'
            });
        }

        return res.status(200).json({
            success: true,
            data: menuItem
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Error retrieving menu item',
            error: error.message
        });
    }
};

// Update Menu Item
exports.updateMenuItem = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Update menu item
        const updatedMenuItem = await MenuItem.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedMenuItem) {
            return res.status(404).json({
                success: false,
                message: 'Menu item not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Menu item updated successfully',
            data: updatedMenuItem
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Error updating menu item',
            error: error.message
        });
    }
};

// Delete Menu Item
exports.deleteMenuItem = async (req, res) => {
    try {
        const { id } = req.params;

        // Delete menu item
        const deletedMenuItem = await MenuItem.findByIdAndDelete(id);

        if (!deletedMenuItem) {
            return res.status(404).json({
                success: false,
                message: 'Menu item not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Menu item deleted successfully'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Error deleting menu item',
            error: error.message
        });
    }
};
