const mongoose = require('mongoose');

const quizGameSchema = mongoose.Schema({
    type: {type: String, required: true},

    quizId: {type: String, required: true},
    correctAnswers: {type: String, required: true},
    incorrectAnswers: {type: String, required: true},
    userId: {type: String, required: true},

    answers: {type: Array, required: true},
    nbRepetition: {type: String, required: false},
});

quizGameSchema.set('versionKey', false);

module.exports = mongoose.model('quizGame', quizGameSchema);