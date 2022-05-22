const mongoose = require('mongoose');

const questionALZSchema = mongoose.Schema({
    label: {type: String, required: true},
    quizId: {type: String, required: true},
    answers: {type: Array, required: true},

    imageUrl: {type: String, required: false},
});

questionALZSchema.set('versionKey', false);

module.exports = mongoose.model('questionALZ', questionALZSchema);