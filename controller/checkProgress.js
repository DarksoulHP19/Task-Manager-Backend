const Group = require("../model/Group");
const Task = require("../model/Task");
const User = require("../model/User");

exports.checkProgress = async (req, res) => {
    try {
        const { groupId } = req.body;
        const mentorId = req.user._id;

        // Verify if the group exists and mentor is assigned to it
        const group = await Group.findOne({ 
            groupId: groupId,
            groupMentor: mentorId 
        }).populate('groupMembers', 'fullName');

        if (!group) {
            return res.status(404).json({
                success: false,
                message: "Group not found or you are not assigned as mentor"
            });
        }

        // Get all tasks for this group
        const tasks = await Task.find({ groupId: groupId });

        // Calculate progress for each member
        const progressData = {};
        
        for (const member of group.groupMembers) {
            const memberTasks = tasks.filter(task => 
                task.groupMembers.includes(member._id)
            );

            let completedTasks = 0;
            let totalTasks = 0;

            memberTasks.forEach(task => {
                task.tasks.forEach(subTask => {
                    totalTasks++;
                    if (subTask.is_completed) {
                        completedTasks++;
                    }
                });
            });

            progressData[member._id] = {
                userName: member.fullName,
                completedTasks,
                totalTasks,
                percentage: totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0
            };
        }

        res.status(200).json({
            success: true,
            data: progressData,
            message: "Progress data fetched successfully"
        });

    } catch (error) {
        console.error('Error checking progress:', error);
        res.status(500).json({
            success: false,
            message: "Error checking progress",
            error: error.message
        });
    }
}; 