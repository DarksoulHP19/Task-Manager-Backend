const Group = require("../model/Group");
const User = require("../model/User");

// Get all groups
exports.getAllGroups = async (req, res) => {
    try {
        const groups = await Group.find()
            .populate('groupMentor', 'fullName email')
            .populate('groupMembers', 'fullName email');
        
        res.status(200).json({
            success: true,
            data: groups
        });
    } catch (error) {
        console.error('Error fetching groups:', error);
        res.status(500).json({
            success: false,
            message: "Error fetching groups",
            error: error.message
        });
    }
};

// Update group
exports.updateGroup = async (req, res) => {
    try {
        const { groupId, projectTitle, projectType, groupMentor, groupMembers } = req.body;
        
        const updatedGroup = await Group.findOneAndUpdate(
            { groupId },
            { projectTitle, projectType, groupMentor, groupMembers },
            { new: true }
        ).populate('groupMentor', 'fullName email')
         .populate('groupMembers', 'fullName email');

        if (!updatedGroup) {
            return res.status(404).json({
                success: false,
                message: "Group not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Group updated successfully",
            data: updatedGroup
        });
    } catch (error) {
        console.error('Error updating group:', error);
        res.status(500).json({
            success: false,
            message: "Error updating group",
            error: error.message
        });
    }
};

// Delete group
exports.deleteGroup = async (req, res) => {
    try {
        const { groupId } = req.params;
        
        const deletedGroup = await Group.findOneAndDelete({ groupId });
        
        if (!deletedGroup) {
            return res.status(404).json({
                success: false,
                message: "Group not found"
            });
        }

        // Remove group from users' groups array
        await User.updateMany(
            { groups: groupId },
            { $pull: { groups: groupId } }
        );

        res.status(200).json({
            success: true,
            message: "Group deleted successfully",
            data: deletedGroup
        });
    } catch (error) {
        console.error('Error deleting group:', error);
        res.status(500).json({
            success: false,
            message: "Error deleting group",
            error: error.message
        });
    }
}; 