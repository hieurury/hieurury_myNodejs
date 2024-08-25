const express = require('express');
const router = express.Router();

//nhận đối tượng được xuất ra ở phía controller
const siteController = require('../app/controllers/user/siteController');

router.get('/', siteController.home);
router.get('/groups', siteController.groups);
router.get('/search', siteController.search);
router.get('/commu/blogs', siteController.commu);

module.exports = router;