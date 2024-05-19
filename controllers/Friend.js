const User = require('../models/User');

exports.addFriend = async (req, res) => {
    try {
        const userId = req.user.id; 
        const friendId = req.params.friendId; 

        // Check if both users exist
        const user = await User.findById(userId);
        const friend = await User.findById(friendId);

        if (!user || !friend) {
            return res.status(404).json({ success: false, message: 'User or friend not found' });
        }

        // Check if they are already friends
        if (user.friends.includes(friendId)) {
            return res.status(400).json({ success: false, message: 'Users are already friends' });
        }

        // Add friend to user's friends list
        user.friends.push(friendId);
        await user.save();

        // Optionally, you can also add the user to the friend's friends list

        res.status(200).json({ success: true, message: 'Friend added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

exports.removeFriend = async (req, res) => {
    try {
        const userId = req.user.id;
        const friendId = req.params.friendId;

        // Check if user exists
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Remove friend from user's friends list
        user.friends = user.friends.filter(friend => friend.toString() !== friendId);
        await user.save();

        // Optionally, you can also remove the user from the friend's friends list

        res.status(200).json({ success: true, message: 'Friend removed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

exports.getFriends = async (req, res) => {
    try {
        const userId = req.user.id;

        // Find user and populate friends
        const user = await User.findById(userId).populate('friends');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, friends: user.friends });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
