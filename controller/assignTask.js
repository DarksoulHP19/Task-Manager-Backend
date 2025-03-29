const Task = require('../model/Task');
const User = require('../model/User');

// CONTROLLER for assigning task to group 
const assignTask = async (req, res) => {
    const { groupId, tasks, groupMentor, groupMembers } = req.body;

    try {
        for (let i = 0; i < groupMembers.length; i++) {
            const newTask = new Task({
                groupId,
                groupMentor,
                groupMembers: [groupMembers[i]], // Assign task to individual user
                tasks,
            });
            let intern = await User.findById(groupMembers[i]);
            if (!intern) {
                return res.status(401).json({
                    success: false,
                    message: `Intern with id ${groupMembers[i]} not found`,
                });
            }
            intern.tasksArr.push(newTask);
            await intern.save();
            await newTask.save();
        }
        res.status(201).json({ message: "Task assigned successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error in assigning task", error: error.message });
    }
};

module.exports = { assignTask };