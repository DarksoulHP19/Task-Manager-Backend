const Group = require("../model/Group");
const User = require("../model/User");

exports.getMentorGroups = async (req, res) => {
    try {
        const mentorId = req.user._id;

        // Find all groups where the current user is the mentor
        const groups = await Group.find({ groupMentor: mentorId })
            .populate('groupMentor', 'fullName email')
            .populate('groupMembers', 'fullName email');

        if (!groups || groups.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No groups found for this mentor"
            });
        }

        res.status(200).json({
            success: true,
            data: groups,
            message: "Groups fetched successfully"
        });
    } catch (error) {
        console.error('Error fetching mentor groups:', error);
        res.status(500).json({
            success: false,
            message: "Error fetching groups",
            error: error.message
        });
    }
}; 