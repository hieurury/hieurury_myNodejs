const express = require('express');
const router = express.Router();

const commuController = require('../app/controllers/user/commuController');
const userRuleRote = require('../config/userRuleRoute');


router.use(userRuleRote)
router.get('/blog/create', commuController.createBlog);
router.get('/blog/:slug', commuController.getBlogWithSlug);
router.post('/blog/post', commuController.postBlog);


module.exports = router;