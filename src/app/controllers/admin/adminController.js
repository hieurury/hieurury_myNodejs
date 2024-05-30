const Admins = require('../../modals/Admins');
const {mongooseToObject} = require('../../../util/setupMongoose');
const {multipleMongooseToObject} = require('../../../util/setupMongoose');
const Groups = require('../../modals/Groups')


class AdminController {


    //GET: /admin
    home(req, res, next) {
        if(req.session && req.session.adminInfo) {
            res.render('admin', 
                {
                    layout: 'admin-page', 
                    message: req.session.message, 
                    admin: req.session.adminInfo
                });
                delete req.session.message;
        } else {
            res.redirect('/admin/login');
        }
    }
    //GET: /admin/:slug
    anyRoute(req, res, next) {
        if(req.session && req.session.adminInfo) {
            next();
        } else {
            res.redirect('/admin/login');
        }
    }

    //GET /admin/login
    login(req, res, next) {
        if(req.session && req.session.adminInfo) {
            res.redirect('/admin');
        } else {
            res.render('admin/adminLogin', 
                {
                    layout: 'adminLogin',
                    data: req.session.adminInfo,
                    message: req.session.message,
                });
                delete req.session.message;
        }
    }
    //GET: /admin/logout
    logout(req, res, next) {
        if(req.session && req.session.adminInfo) {
            delete req.session.adminInfo;
            res.redirect('/admin/login');
        } else {
            res.redirect('/admin/login');
        }
    }
    //POST /admin/login/store
    store(req, res, next) {
        //lấy dữ liệu được gửi đi.
        const data = req.body;
        Admins.findOne({name: data.name, password: data.password})
        .then((result) => {
            if(result) {
                req.session.adminInfo = result;
                req.session.message = 'success';
                res.redirect('/admin');
            } else {
                req.session.message = 'error';
                res.redirect('/admin/login');
            }
        })
        .catch(next)
        }

    
    //GET: /admin/groups
    groups(req, res, next) {
        Groups.find({})
            .then((groups) => {
                res.render('admin/groups/groups', 
                    {
                        groups: multipleMongooseToObject(groups), 
                        layout: 'admin-page',
                        message: req.session.message,
                    });
                delete req.session.message;
            })
            .catch(next)
    }    
    
    

    //GET: /admin/groups/:slug
    anyGroup(req, res, next) {
        Groups.findOne({name: req.params.group})
            .then((group) => {
                res.json(group);
            })
            .catch(next)
    }
    //GET: /admin/groups/edit
    groupsEdit(req, res, next) {
        Groups.find({})
            .then((groups) => {
                res.render('admin/groups/groups-edit', 
                    {
                        layout: 'admin-page', 
                        groups: multipleMongooseToObject(groups), 
                        admin: req.session.adminInfo
                    });
            })
            .catch(next)
    }
    //GET: /admin/groups/edit/:ChangeDocument
    changeGroup(req, res, next) {
        Groups.findOne({name: req.params.group})
            .then((group) => {
                res.render('admin/groups/groups-change', 
                    {
                        layout: 'admin-page', 
                        group: mongooseToObject(group)
                    })
            })
            .catch(next)
    }

        
    

}

module.exports = new AdminController;