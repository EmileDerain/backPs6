const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    picture: {type: String, required: true},
    name: {type: String, required: true, unique: true},
    type: {type: String, required: true},
});

userSchema.set('versionKey', false);
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('user', userSchema);