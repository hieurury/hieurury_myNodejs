const Blogs = require('../../modals/Blogs');
const Groups = require('../../modals/Groups')
const Users = require('../../modals/User');
const {mongooseToObject} = require('../../../util/setupMongoose');
const {multipleMongooseToObject} = require('../../../util/setupMongoose');

class SiteController {
    //GET "/"
    home(req, res) {
        // Groups.find({})
        //     .then((groups) => {
        //         res.render('home', 
        //             {
        //                 message: req.session.message,
        //                 groups: multipleMongooseToObject(groups),
                        

        //             });
        //         delete req.session.message;
        //     })
        //     .catch(() => {
        //         res.send("không nhận được dữ liệu mong muốn.");
        //     })

        Promise.all([
            Groups.find({}),
            Blogs.find({})
                .populate('author', 'name')
        ])
        .then(([Groups, Blogs]) => {
            res.render('home', {
                message: req.session.message,
                groups: multipleMongooseToObject(Groups),
                blogs: multipleMongooseToObject(Blogs),
            })
        })
    }

    //GET "/search"
    search(req, res) {
        res.send("đây là thanh search");
    }

    //GET: /commu
    commu(req, res) {
        Blogs.find({})
            .populate('author', 'name')
            .then((blogs) => {
                res.render('commu/commu-page', {
                    blogs: multipleMongooseToObject(blogs),
                })
            })
    }

    //GET: /groups
    groups(req, res, next) {
        Groups.find({})
            .then((groups) => {
                res.render('groups', {groups: multipleMongooseToObject(groups)})
            })
            .catch(next);
    }


}


module.exports = new SiteController;