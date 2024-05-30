const Users = require('../../modals/User');
const {mongooseToObject} = require('../../../util/setupMongoose');
const {multipleMongooseToObject} = require('../../../util/setupMongoose');


class AccountController {
    //GET: /account/login
    login(req, res, next) {
        const message = req.session.message;
        res.render('user/user-setup', {layout: 'user-account', message: message});
        delete req.session.message;
    }

    //POST /account/register/store
    registerStore(req, res, next) {
        const data = req.body;

        Users.findOne({name: data.name, password: data.password})
            .then((user) => {
                if(user) {
                    req.session.message = "warning";
                    res.redirect('/account/login');
                } else {
                    const newData = new Users(data);
                    newData.save()
                        .then(() => {
                            req.session.message = "success";
                            res.redirect('/account/login');
                        })
                        .catch(next)
                }
            })
            .catch(next)
    }

    //POST: /account/login/store
    loginStore(req, res, next) {
        const data = req.body;

        Users.findOne({name: data.name, password: data.password})
            .then((user) => {
                if(user) {
                    req.session.message = "success";
                    req.session.userInfo = user;
                    res.redirect('/');
                } else {
                    req.session.message = "error";
                    res.redirect('back');
                }
            })
            .catch(next)
    }

    //POST: /account/login/store
    logout(req, res, next) {
        delete req.session.userInfo;
        res.redirect('/account/login');
    }
}

module.exports = new AccountController;