const Task = require("../model/Task");
const User = require("../model/User");

const completeTask = async (req, res) => {
    const { taskArrid, tasksids} = req.body;

    try {
        // if (!user) {
        //     return res.status(404).json({ message: "User not found" });
        // }
       

        const task = await Task.findById(taskArrid);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        tasksids.forEach(taskId => {
            const taskItem = task.tasks.id(taskId);
            if (taskItem) {
                taskItem.is_completed = true;
            }
        });

        await task.save();
        res.status(200).json({ message: "Task completed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error in completing task", error: error.message });
    }
};

exports.completeTask = completeTask;