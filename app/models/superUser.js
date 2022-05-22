const mongoose = require('mongoose');

const superUserSchema = mongoose.Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},

    password: {type: String, required: true},
});

superUserSchema.set('versionKey', false);

module.exports = mongoose.model('superUser', superUserSchema);