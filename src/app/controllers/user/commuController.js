const Blogs = require('../../modals/Blogs');
const {mongooseToObject} = require('../../../util/setupMongoose');
const {multipleMongooseToObject} = require('../../../util/setupMongoose');

class CommuController {
    //GET: /commu/blog/create
    createBlog(req, res, next) {
        res.render('commu/commu-create-blog');
    }
    //POST: /commu/blog/post
    postBlog(req, res, next) {
        const author = req.session.userInfo._id;
        let data = req.body;
        data.author = author;
        const newData = new Blogs(data);
        newData.save()
            .then(() => {
                res.redirect('/commu');
            })
            .catch(next)
    }
    //GET: /commu/blog/:slug
    getBlogWithSlug(req, res, next) {
        Blogs.findOne({slug: req.params.slug})
            .populate('author', 'name')
            .then(blog => {
                res.render('commu/commu-blog-info', {
                    blog: mongooseToObject(blog),
                })
            })
            .catch(() => {
                
            })
    }
    //POST: /upload-image
    uploadImage(req, res) {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        res.json({ uploaded: true, url: imageUrl });
    }

    
}

module.exports = new CommuController;