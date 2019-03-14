const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const User = new Schema({
    userId: String,
    password: String,
    created: {
        type: Date,
        default: Date.now
    },
    todolists: {
        type: Array,
        default: []
    }
});

User.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, 8);
}

User.methods.validateHash = function(password){
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('user', User);