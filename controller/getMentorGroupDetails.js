const Group = require("../model/Group");
const User = require("../model/User");

exports.getMentorGroupDetails = async (req, res) => {
    try {
        const mentorId = req.user._id;

        // Find all groups where the user is a mentor
        const groups = await Group.find({ groupMentor: mentorId })
            .populate('groupMembers', 'fullName email')
            .populate('groupMentor', 'fullName email');

        if (!groups || groups.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No groups found for this mentor"
            });
        }

        res.status(200).json({
            success: true,
            data: groups,
            message: "Group details fetched successfully"
        });

    } catch (error) {
        console.error('Error fetching group details:', error);
        res.status(500).json({
            success: false,
            message: "Error fetching group details",
            error: error.message
        });
    }
};