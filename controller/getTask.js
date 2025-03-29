const Task = require('../model/Task');
const User = require('../model/User');

const getTask = async (req, res) => {
    try {
        const userId = req.user._id;
        
        // Find all tasks assigned to this user
        const tasks = await Task.find({
            groupMembers: userId
        }).populate('groupMentor', 'fullName');

        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ 
                success: false,
                message: "No tasks found for this user" 
            });
        }

        res.status(200).json({
            success: true,
            data: tasks,
            message: "Tasks fetched successfully"
        });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ 
            success: false,
            message: "Error fetching tasks", 
            error: error.message 
        });
    }
};

module.exports = { getTask };