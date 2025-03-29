const express =  require('express');
const router = express.Router();
const { addGroup } = require('../controller/addGroup');



//router for adding group
router.post('/addGroup',addGroup);

module.exports = router;