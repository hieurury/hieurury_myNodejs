const express = require('express');
const router = express.Router();

const adminControllers = require('../../app/controllers/admin/adminController');

router.get('/create', adminControllers.createGroup);
router.get('/edit', adminControllers.groupsEdit);
router.get('/edit/:group', adminControllers.changeGroup);
router.get('/:group', adminControllers.anyGroup);
router.get('/', adminControllers.groups);




module.exports = router;