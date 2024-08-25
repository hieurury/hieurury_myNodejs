
const siteRouter = require('./site');
const groupRouter = require('./group');
const adminRouter = require('./admin/admin');
const accountRouter = require('./account');
const meRouter = require('./me');
const commuRouter = require('./commu');


function route(app) {

    // Các router khác
    app.use('/admin', adminRouter);
    app.use('/groups', groupRouter);
    app.use('/account', accountRouter);
    app.use('/me', meRouter);
    app.use('/commu', commuRouter);
    app.use('/', siteRouter);
}

module.exports = route;
