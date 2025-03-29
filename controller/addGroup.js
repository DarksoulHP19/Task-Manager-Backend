require("dotenv").config();
const Group = require("../model/Group");
const User = require("../model/User");
const jwt = require("jsonwebtoken");

exports.addGroup = async (req, res) => {
    try {
        const { groupId, projectTitle, projectType, groupMentor, groupMembers, token } = req.body;

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Check if group already exists
        const existingGroup = await Group.findOne({ groupId });
        if (existingGroup) {
            return res.status(400).json({
                success: false,
                message: "Group ID already exists"
            });
        }

        // Create new group with projectType
        const newGroup = await Group.create({
            groupId,
            projectTitle,
            projectType,
            groupMentor,
            groupMembers
        });

        // Update user documents to include the new group
        await User.updateMany(
            { _id: { $in: [groupMentor, ...groupMembers] } },
            { $push: { groups: newGroup._id } }
        );

        res.status(201).json({
            success: true,
            message: "Group created successfully",
            data: newGroup
        });

    } catch (error) {
        console.error('Error creating group:', error);
        res.status(500).json({
            success: false,
            message: "Error creating group",
            error: error.message
        });
    }
};