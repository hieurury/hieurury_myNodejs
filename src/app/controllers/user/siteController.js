
const Groups = require('../../modals/Groups')

const {mongooseToObject} = require('../../../util/setupMongoose');
const {multipleMongooseToObject} = require('../../../util/setupMongoose');

class SiteController {
    //GET "/"
    home(req, res) {
        Groups.find({})
            .then((groups) => {
                res.render('home', 
                    {
                        message: req.session.message,
                        groups: multipleMongooseToObject(groups),
                        

                    });
                delete req.session.message;
            })
            .catch(() => {
                res.send("không nhận được dữ liệu mong muốn.");
            })
    }

    //GET "/search"
    search(req, res) {
        res.send("đây là thanh search");
    }

    //GET: /commu
    commu(req, res) {
        res.render('commu/commu-page');
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