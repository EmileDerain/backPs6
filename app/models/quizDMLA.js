const mongoose = require('mongoose');

const quizDMLASchema = mongoose.Schema({
    theme: {type: String, required: true},
    name: {type: String, required: true},
    questions: {type: Array, required: true},
});

quizDMLASchema.set('versionKey', false);

module.exports = mongoose.model('quizDMLA', quizDMLASchema);