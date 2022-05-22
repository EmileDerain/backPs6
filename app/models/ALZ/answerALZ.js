const mongoose = require('mongoose');

const answerALZSchema = mongoose.Schema({
    value: {type: String, required: true},
    isCorrect: {type: Boolean, required: true},
    questionId: {type: String, required: true},
});

answerALZSchema.set('versionKey', false);

module.exports = mongoose.model('answerALZ', answerALZSchema);