const express = require('express');
const router = express.Router();

const adminControllers = require('../../app/controllers/admin/adminController');
const adminGroupControllers = require('../../app/controllers/admin/adminGroupController');
const adminUserControllers = require('../../app/controllers/admin/adminUserController');
const adminRuleRote = require('../../config/adminRuleRoute');

//các route không cần phải bảo vệ
//các route này chủ yếu cho việc thực hiện đăng nhập
//->nên không cần áp dụng việc xác thực
router.get('/login', adminControllers.login);
router.post('/login/store', adminControllers.store);


//sử dụng middleWare đề bảo vệ các route phía bên dưới
//những đường dẫn bên dưới sẽ yêu cầu đăng nhập để truy cập
router.use(adminRuleRote);

router.get('/logout', adminControllers.logout);
router.get('/:any', adminControllers.anyRoute);

//làm việc với groups
router.get('/groups', adminGroupControllers.groups);
router.get('/groups/create', adminGroupControllers.createGroup);
router.post('/groups/create/stored', adminGroupControllers.createGroupStored);
router.get('/groups/edit', adminGroupControllers.groupsEdit);
router.get('/groups/edit/:groupSlug', adminGroupControllers.changeGroup);
router.put('/groups/edit/:idGroup/change', adminGroupControllers.updateGroup);
router.get('/groups/:group', adminGroupControllers.anyGroup);
router.get('/groups/:group/editVideo', adminGroupControllers.editVideo);
router.put('/groups/:idGroup/postVideo', adminGroupControllers.postVideo);
router.get('/', adminControllers.home);

//làm việc với user
router.get('/users-manager/users-table', adminUserControllers.usersManager);



module.exports = router;