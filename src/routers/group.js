const express = require('express');
const router = express.Router();

const GroupControllers = require('../app/controllers/user/groupController');

router.get('/:slug', GroupControllers.getGroup);
router.get('/watch/:slug', GroupControllers.watchVideo);


module.exports = router;