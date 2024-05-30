const Admins = require('../../modals/Admins');
const {mongooseToObject} = require('../../../util/setupMongoose');
const {multipleMongooseToObject} = require('../../../util/setupMongoose');

const Groups = require('../../modals/Groups')


class AdminGroupController {


    //GET: /admin/groups
    groups(req, res, next) {
        Groups.find({})
            .then((groups) => {
                res.render('admin/groups/groups', 
                    {
                        groups: multipleMongooseToObject(groups), 
                        layout: 'admin-page'
                    });
            })
            .catch(next)
    }    


    //GET: /admin/groups/:slug
    anyGroup(req, res, next) {
        Groups.findOne({name: req.params.group})
            .then((group) => {
                res.render('admin/groups/groups-info', 
                    {
                        layout: 'admin-page',
                        group: mongooseToObject(group),
                        videos: group.videos,
                    })
            })
            .catch(next)
    }
     //GET: /admin/groups/:slug/editVideo
     editVideo(req, res, next) {
        Groups.findOne({name: req.params.group})
            .then((group) => {
                res.render('admin/groups/edit-video', 
                    {
                        layout: 'admin-page',
                        group: mongooseToObject(group),
                    })
            })
            .catch(next)
    }
     //PUT: /admin/groups/:idGroup/postVideo
     postVideo(req, res, next) {
       const data = req.body;
        Groups.findOne({_id: req.params.idGroup})
            .then((group) => {
                group.videos.push(data);
                Groups.updateOne({_id: req.params.idGroup}, group)
                    .then(() => res.redirect('back'))
                    .catch(next)
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
        Groups.findOne({slug: req.params.groupSlug})
            .then((group) => {
                res.render('admin/groups/groups-change', 
                    {
                        layout: 'admin-page', 
                        group: mongooseToObject(group)
                    })
            })
            .catch(next)
    }
    //PUT: /admin/groups/edit/:id/change
    updateGroup(req, res, next) {
        let data = req.body;
        data.author = req.session.adminInfo.name;
        Groups.updateOne({_id:req.params.idGroup}, data)
            .then(() => res.redirect('/admin/groups/edit'))
            .catch((err) => {
                console.error(`lỗi: ${err}`)
            })
            
    }

    //GET: /admin/groups/create
    createGroup(req, res, next) {
        res.render("admin/groups/groups-create", 
            {
                layout: "admin-page",
            })
    }

    //POST: /admin/groups/create/stored
    createGroupStored(req, res, next) {
        let data = req.body;
        data.author = req.session.adminInfo.name;//lấy tên admin 
        const newData = new Groups(data);

        newData.save()
            .then(() => {
                req.session.message = 'success';
                res.redirect('/admin/groups');
            })
            .catch(next);
        
    }

        
    

}

module.exports = new AdminGroupController;