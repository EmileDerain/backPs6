const express = require('express');
const router = express.Router({mergeParams: true});

const userCtrl = require('../../controllers/DMLA/quizDMLA');
const questionDMLARoute = require("./questionDMLA/questionDMLA")

router.use('/:idQuizDMLA/questionsDmla', questionDMLARoute)

router.post('/', userCtrl.createQuizDMLA);
router.get('/', userCtrl.getAllQuizDMLA)
router.get('/:idQuizDMLA', userCtrl.getQuizDMLAById);
router.get('/theme/:theme', userCtrl.getQuizDMLAByTheme);

router.put('/:idQuizDMLA', userCtrl.putQuizDMLAById)       //INUTILE
router.delete('/:idQuizDMLA', userCtrl.deleteQuizDMLAById)

module.exports = router;