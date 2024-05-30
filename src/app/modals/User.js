const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Profile = new Schema ({
    fullName: {type: String, default: null},
    avatar: {type: String, default: null},
    gender: {type: String, default: null},
    about: {type: String, default: null},
    groupsStored: {type: [Object], default: []},
})

const User = new Schema ({
    name: {type: String},
    password: {type: String},
    email: {type: String, default: null},
    profile: {type: Profile, default: {}},


}, {
    timestamps: true,
});

module.exports = mongoose.model('User', User);