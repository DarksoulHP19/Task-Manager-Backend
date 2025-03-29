const Group = require("../model/Group");
const Task = require("../model/Task");
const User = require("../model/User");

const checkProgress = async (req, res) => {
    const { groupId } = req.body;
    try {
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(400).json({ msg: "Group does not exist" });
        }

        const tasks = await Task.find({ groupId: groupId });
        if (!tasks || tasks.length === 0) {
            return res.status(400).json({ msg: "Tasks do not exist" });
        }

        const userProgress = {};

        tasks.forEach(task => {
            task.groupMembers.forEach(memberId => {
                if (!userProgress[memberId]) {
                    userProgress[memberId] = { completedTasks: 0, totalTasks: 0 };
                }
                task.tasks.forEach(subTask => {
                    userProgress[memberId].totalTasks++;
                    if (subTask.is_completed) {
                        userProgress[memberId].completedTasks++;
                    }
                });
            });
        });

        const progressArray = await Promise.all(Object.keys(userProgress).map(async userId => {
            const user = await User.findById(userId);
            const progress = (userProgress[userId].completedTasks / userProgress[userId].totalTasks) * 100;
            console.log(user,progress);
            return { user: user.name, progress: progress };
        }));

        res.status(200).json(progressArray);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server Error" });
    }
};

module.exports = { checkProgress };