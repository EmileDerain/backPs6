const express = require('express');
const router = express.Router({mergeParams: true});

const userCtrl = require('../../controllers/user');
// const questionDMLARoute = require("./questionDMLA/questionDMLA")

// router.use('/:idQuizDMLA/questionsDmla', questionDMLARoute)

router.post('/', userCtrl.createUser);
router.get('/', userCtrl.getAllUser)
router.get('/:idUser', userCtrl.getUserById);

// router.put('/:idQuizDMLA', userCtrl.putQuizDMLAById)       //INUTILE
router.delete('/:idUser', userCtrl.deleteUserById)

module.exports = router;