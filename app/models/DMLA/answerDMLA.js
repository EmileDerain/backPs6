const mongoose = require('mongoose');

const answerDMLASchema = mongoose.Schema({
    value: {type: String, required: true},
    isCorrect: {type: Boolean, required: true},
    questionId: {type: String, required: true},
});

answerDMLASchema.set('versionKey', false);

module.exports = mongoose.model('answerDMLA', answerDMLASchema);