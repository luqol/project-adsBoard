const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    login: {type: String, required: true, minlength: 3, maxlength: 20},
    password: {type: String, required: true},
    avatar: {type: String, required: true},
    mobile: {type: Number, required: true}
});

module.exports = mongoose.model('User', userSchema);