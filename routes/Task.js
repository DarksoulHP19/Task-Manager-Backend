const express = require('express');
const router = express.Router();
const { assignTask } = require('../controller/assignTask');
const { auth, isMentor, isIntern, isCoordinator } = require('../middleware/auth');
const { completeTask } = require('../controller/completeTask');
const { addGroup } = require('../controller/addGroup');
const { getTask } = require('../controller/getTask');
const { getAllGroups, updateGroup, deleteGroup } = require('../controller/manageGroup');
const { getMentorGroups } = require('../controller/getMentorGroups');
const { checkProgress } = require('../controller/checkProgress');
const { getMentorGroupDetails } = require('../controller/getMentorGroupDetails');

router.post('/assignTask', auth, isMentor, assignTask);
router.post('/complteTask', auth, isIntern, completeTask);
router.post('/addGroup', auth, isCoordinator, addGroup);

// New group management routes
router.get('/getGroups', auth, isCoordinator, getAllGroups);
router.get('/getTask', auth, isIntern, getTask);
router.put('/updateGroup', auth, isCoordinator, updateGroup);
router.delete('/deleteGroup/:groupId', auth, isCoordinator, deleteGroup);

// New route for getting mentor's groups
router.get('/getMentorGroups', auth, isMentor, getMentorGroups);
router.post('/checkProgress', auth, isMentor, checkProgress);

// Add this route with other mentor routes
router.get('/getMentorGroupDetails', auth, isMentor, getMentorGroupDetails);

module.exports = router;