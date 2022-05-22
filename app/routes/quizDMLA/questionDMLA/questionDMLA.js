const express = require('express');
const router = express.Router({mergeParams: true});

const userCtrl = require('../../../controllers/questionDMLA');

const answerDMLARoute = require("./answerDMLA/answerDMLA")

router.use('/:idQuestionDMLA/answersDmla', answerDMLARoute)

router.post('/', userCtrl.createQuestionDMLA);
router.get('/:idQuestionDMLA', userCtrl.getQuestionDMLAById);     //INUTILE

router.delete('/:idQuestionDMLA', userCtrl.deleteQuestionDMLAById)

module.exports = router;