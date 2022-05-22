const mongoose = require('mongoose');

const questionDMLASchema = mongoose.Schema({
    label: {type: String, required: true},
    quizId: {type: String, required: true},
    answers: {type: Array, required: true},
});

questionDMLASchema.set('versionKey', false);

module.exports = mongoose.model('questionDMLA', questionDMLASchema);