const mongoose = require('mongoose');
const mongooseSlug = require('mongoose-slug-generator');
const Schema =  mongoose.Schema;
mongoose.plugin(mongooseSlug);

const Video = new Schema({
    title: {type: String},
    link: {type: String},
})

const Group = new Schema({
    name: {type: String},
    description: {type: String},
    img: {type: String},
    author: {type: String},
    videos: [Video],
    documents: {type: Array, default: null},
    slug: {type: String, slug: "name"},

}, {
    timestamps: true,
})

module.exports = mongoose.model("Group", Group);

