module.exports = (req, res, next) => {
    if(req.session && req.session.userInfo) {
        next();
    } else {
        res.redirect('/account/login');
    }
};