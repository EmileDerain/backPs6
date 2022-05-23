const express = require('express');
const router = express.Router({mergeParams: true});

const userCtrl = require('../../controllers/ALZ/quizALZ');
const questionALZRoute = require("./questionALZ/questionALZ")

router.use('/:idQuizALZ/questionsALZ', questionALZRoute)

router.post('/', userCtrl.createQuizALZ);
router.get('/', userCtrl.getAllQuizALZ)
router.get('/:idQuizALZ', userCtrl.getQuizALZById);
router.get('/theme/:theme', userCtrl.getQuizALZByTheme);

// router.put('/:idQuizALZ', userCtrl.putQuizALZById)       //INUTILE
router.delete('/:idQuizALZ', userCtrl.deleteQuizALZById)

module.exports = router;