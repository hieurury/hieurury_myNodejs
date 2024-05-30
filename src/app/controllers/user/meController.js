const Users = require('../../modals/User');
const Groups = require('../../modals/Groups');
const {mongooseToObject} = require('../../../util/setupMongoose');
const {multipleMongooseToObject} = require('../../../util/setupMongoose');


class MeController {
    //GET: /me
    //đưa đến trang cá nhân của người dùng
    //trang chủ trang cá nhân chứa các trang con.
    profile(req, res, next) {
        //kiểm tra đăng nhập.
        if(req.session.userInfo) {
            //tìm thông tin người dùng dựa trên đăng nhập trong session
            Users.findOne({_id: req.session.userInfo._id})
                .then(user => {
                    //tạo một biến giúp chứa các group đã join vào
                    //sau đó lặp qua từng group đã join trong dữ liệu người dùng dựa vào id của group
                    //từ đó lấy dữ liệu hoàn chỉnh của các group
                     let joinedGroups = user.profile.groupsStored.map(group => Groups.findOne({_id: group.idGroup}));
                    //chờ tất cả tiến trình Promise hoàn tất
                    //nhận kết quả trả về và render ra trang cá nhân với các thông số được thiết lập.
                    Promise.all(joinedGroups)
                            .then(data => {
                                res.render('user/me/profile', {
                                    layout: "me-layout",
                                    joinedGroups: multipleMongooseToObject(data),
                                    user: mongooseToObject(user),
                                });
                            })
                            .catch(next)
                    
                })
                .catch(next)
        } else {
            //chuyển về trang đăng nhập nếu chưa đăng nhập.
            res.redirect('/account/login');
        }
    }

   //PUT: me/groups/subcribe/:idGroup
   //chức năng đăng kí các group
   groupSubcribe(req, res, next) {
    //kiểm tra xem đã đăng nhập chưa
    if(req.session.userInfo) {
        let data = req.session.userInfo;
        //thêm group vào danh sách đăng kí
        data.profile.groupsStored.push({
            idGroup: req.params.idGroup,
            temporaryVideo: null,
        })
        //cập nhật lại thông tin
        Users.updateOne({_id: req.session.userInfo._id}, data)
            .then(() => {
                res.redirect('/groups');
            })
            .catch(next)
    } else {
        //chưa đăng nhập thì chuyển về trang đăng nhập
        res.redirect('/account/login');
    }
   }
    
}
module.exports = new MeController;