const express = require('express');
const router = express.Router({mergeParams: true});

const userCtrl = require('../../../controllers/ALZ/questionALZ');

const answerALZRoute = require("./answerALZ/answerALZ")

router.use('/:idQuestionALZ/answersALZ', answerALZRoute)

router.post('/', userCtrl.createQuestionALZ);
// router.get('/:idQuestionDMLA', userCtrl.getQuestionDMLAById);     //INUTILE
//
// router.delete('/:idQuestionDMLA', userCtrl.deleteQuestionDMLAById)

module.exports = router;