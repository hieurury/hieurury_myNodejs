const mongoose = require('mongoose');
const mongooseSlug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;
mongoose.plugin(mongooseSlug);


const Blog = new Schema({
    title: {type: String, required: true},
    image: {type: String, required: true},
    content: {type: String, required: true},
    author: {type: Schema.Types.ObjectId, 
            ref: 'User', 
            required: true},
    view: {type: Number, default: 0},
    slug: {type: String, slug: 'title'},
}, {
    timestamps: true,
})

module.exports = mongoose.model('Blog', Blog);