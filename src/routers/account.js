const express = require('express');
const router = express.Router();

const accountControllers = require('../app/controllers/user/accountController');

router.get('/login', accountControllers.login);
router.get('/logout', accountControllers.logout);
router.post('/register/store', accountControllers.registerStore);
router.post('/login/store', accountControllers.loginStore);


module.exports = router;