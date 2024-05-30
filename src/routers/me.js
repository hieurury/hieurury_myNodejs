const express = require('express');
const Router = express.Router();

const MeController = require('../../src/app/controllers/user/meController');

Router.put('/groups/subcribe/:idGroup', MeController.groupSubcribe);
Router.get('/', MeController.profile);

module.exports = Router;