const express = require('express');
const router = express.Router({mergeParams: true});

const userCtrl = require('../../controllers/quizGame');

router.post('/DMLA', userCtrl.createQuizGameDMLA);
router.post('/ALZ', userCtrl.createQuizGameALZ);

router.get('/', userCtrl.getAllQuizGame);   //INUTILE ?
router.get('/:idQuizGame', userCtrl.getQuizGameById);
router.get('/User/:idU', userCtrl.getQuizGameByIdUser);

router.put('/:idQuizGame', userCtrl.putQuizGameById);


module.exports = router;