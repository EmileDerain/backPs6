const express = require('express');
const router = express.Router({mergeParams: true});

const userCtrl = require('../../../controllers/ALZ/questionALZ');

const answerALZRoute = require("./answerALZ/answerALZ")

router.use('/:idQuestionALZ/answersALZ', answerALZRoute)

router.post('/', userCtrl.createQuestionALZ);
router.get('/:idQuestionALZ', userCtrl.getQuestionALZById);     //INUTILE
//
router.delete('/:idQuestionALZ', userCtrl.deleteQuestionALZById)

module.exports = router;