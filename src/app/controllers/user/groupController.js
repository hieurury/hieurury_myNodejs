
const Groups = require('../../modals/Groups');

const {mongooseToObject} = require('../../../util/setupMongoose');
const {multipleMongooseToObject} = require('../../../util/setupMongoose');
const User = require('../../modals/User');

class GroupController {

    
    //GET: /groups/:slug
    getGroup(req, res, next) {
        Groups.findOne({slug: req.params.slug})
            .then((group) => {
                if(req.session.userInfo) {
                    //tìm user dựa trên đăng nhập ở session
                    User.findOne({_id: req.session.userInfo._id})
                    .then(user => {
                        //kiểm tra xem user đã có đăng kí group nào chưa
                        if(user.profile.groupsStored) {
                            //lặp qua từng group đã đăng kí để tìm group hiện tại
                            let groupSave;
                            for(let meGroup of user.profile.groupsStored) {
                                if(meGroup.idGroup.toString() === group._id.toString()) {
                                    groupSave = meGroup;
                                    break;
                                }
                            }
                            //kiểm tra xem user có đăng kí group hiện tại chưa
                            if(groupSave) {
                                //nếu group hiện tại đã được đăng kí
                                let currentVideo;
                                //kiểm tra xem đã từng xem video nào chưa
                                if(groupSave.temporaryVideo) {
                                    for(let video of group.videos) {
                                        //nếu đã từng xem một video bất kì trong group rồi...
                                        //thì lấy video đó làm video hiện tại để xem tiếp.
                                        if(video._id.toString() === groupSave.temporaryVideo.toString()) {
                                            currentVideo = video;
                                            break;
                                        }
                                    }
                                } else {
                                    //nếu chưa từng xem video nào thì đặt video để xem là video đầu tiên
                                    currentVideo = group.videos[0];
                                }
                                //render ra trang xem video với các thông số đã đặt ở trên.
                                res.render('groups/watch-video', {
                                    layout: 'me-layout',
                                    currentVideo: mongooseToObject(currentVideo),
                                    group: mongooseToObject(group),
                                })
                            } else {
                                //nếu chưa đăng kí thì chuyển về trang thông tin của group
                                res.render('groups/group-info', {
                                    group: mongooseToObject(group),
                                });
                            } 
                        } else {
                            //chưa đăng kí group nào thì chuyển về trang đăng kí
                            res.render('groups/group-info', {
                                group: mongooseToObject(group),
                            });
                        }
                        
                    })
                } else {
                    res.render('groups/group-info', {
                        group: mongooseToObject(group),
                    });
                }
                
            })
            .catch(next)
    }
    //GET: /groups/watch/:slug?idVideo=something
    watchVideo(req, res, next) {
        if(req.session.userInfo) {
            //tìm nhóm tài liệu dựa trên slug ở url
            Groups.findOne({slug: req.params.slug})
            .then(group => {
                let currentVideo;
                //tìm video muốn xem dựa trên id được nhận
                for(let video of group.videos) {
                    if(video._id.toString() === req.query.idVideo) {
                        currentVideo = video;
                        break;
                    }
                }
                //lấy ra người dùng hiện tại từ session
                let dataUser = req.session.userInfo;
                //tìm group đang trỏ đến trong danh sách các group của người dùng
                for(let meGroup of dataUser.profile.groupsStored) {
                    if(group._id.toString() === meGroup.idGroup) {
                        //cập nhật video xem gần nhất
                        meGroup.temporaryVideo = currentVideo._id;
                        break;
                    }
                }
                //lưu dữ liệu lại cho người dùng
                User.updateOne({_id: dataUser._id}, dataUser)
                    .then(() => {
                        res.render("groups/watch-video", {
                            layout: 'me-layout',
                            group: mongooseToObject(group),
                            currentVideo: mongooseToObject(currentVideo),
                        })
                    })
                    .catch(next)
                
            })
            .catch(next)
        } else {
            req.session.message = 'info';
            res.redirect('/account/login');
        }
        
    }

}

module.exports = new GroupController;