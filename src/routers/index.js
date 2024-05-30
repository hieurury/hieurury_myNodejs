

const siteRouter = require('./site');
const groupRouter = require('./group');
const adminRouter = require('./admin/admin');
const accountRouter = require('./account');
const meRouter = require('./me');

function route(app) {
    app.use('/admin', adminRouter);
    app.use('/groups', groupRouter);
    app.use('/account', accountRouter);
    app.use('/me', meRouter);
    app.use('/', siteRouter);
}

module.exports = route;