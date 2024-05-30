const Users = require('../../modals/User');
const {mongooseToObject} = require('../../../util/setupMongoose');
const {multipleMongooseToObject} = require('../../../util/setupMongoose');


class AdminUserController {

    //GET: /admin/users-manager/users-table
    usersManager(req, res, next) {
        Users.find({})
            .then((users) => {
                res.render('admin/usersManager/users-table', 
                {
                    users: multipleMongooseToObject(users),
                    layout: 'admin-page'
                })
            })
            .catch(next)
    }

    

        
    

}

module.exports = new AdminUserController;