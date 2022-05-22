const mongoose = require('mongoose');

const quizALZSchema = mongoose.Schema({
    theme: {type: String, required: true},
    name: {type: String, required: true},
    questions: {type: Array, required: true},

    nbRepetition: {type: String, required: false},
});

quizALZSchema.set('versionKey', false);

module.exports = mongoose.model('quizALZ', quizALZSchema);