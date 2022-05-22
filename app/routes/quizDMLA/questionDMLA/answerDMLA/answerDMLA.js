const express = require('express');
const router = express.Router({mergeParams: true});

const userCtrl = require('../../../../controllers/answerDMLA');


router.post('/', userCtrl.createAnswerDMLA);
router.get('/:idAnswerDMLA', userCtrl.getAnswerDMLAById);


module.exports = router;