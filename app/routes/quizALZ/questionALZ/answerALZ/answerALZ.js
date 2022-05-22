const express = require('express');
const router = express.Router({mergeParams: true});

const userCtrl = require('../../../../controllers/ALZ/answerALZ');


router.post('/', userCtrl.createAnswerALZ);
router.get('/:idAnswerALZ', userCtrl.getAnswerALZById);   //INUTILE


module.exports = router;