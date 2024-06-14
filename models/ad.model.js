const mongoose = require('mongoose');

const adSchema = new mongoose.Schema( {
    title: {type: String, required: true,  minlength: 10, maxlength: 50},
    description: {type: String, required: true, minlength: 20, maxlength: 1000},
    publicDate: {type: Date, required: true},
    img: {type: String, required: true},
    price: {type: Number, required: true},
    localization: {type: String, required: true, minlength: 3, maxlength: 50},
    seller: {type: mongoose.Schema.Types.ObjectId , required: true, ref: 'User'}
    //seller: {type: String , required: true, ref: 'User'}

});

module.exports = mongoose.model('Ad', adSchema);