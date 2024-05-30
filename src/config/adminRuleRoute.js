module.exports = (req, res, next) => {
    if(req.session && req.session.adminInfo) {
        next();
    } else {
        res.redirect('/admin/login');
    }
};