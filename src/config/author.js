module.exports = (req, res, next) => {
    if(req.session && req.session.userInfo) {
        res.locals.user = req.session.userInfo;
    }
    next();
};