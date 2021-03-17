const mongoose = require('mongoose')

// admin schema
const adminSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('admin', adminSchema)
