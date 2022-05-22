const QuestionALZ = require('../../models/ALZ/questionALZ');
const AnswerALZ = require('../../models/ALZ/answerALZ');


exports.createQuestionALZ = (req, res) => {
    console.log("req.body", req.body)

    const quizALZ = new QuestionALZ({
        label: req.body.label,
        quizId: req.params.idQuizALZ,
        // answers: req.body.answers,
    });

    quizALZ.save()
        .then(() => {
            QuestionALZ.findOne({quizId: req.params.idQuizALZ, label: req.body.label})
                .then(question => {
                    if (req.body.answers !== undefined){
                        req.body.answers.forEach(a => {
                            const answerALZ = new AnswerALZ({
                                value: a.value,
                                questionId: question._id,
                                isCorrect: a.isCorrect,
                            });
                            answerALZ.save()
                                .then()
                                .catch(error => res.status(404).json({erreur: "Erreur dans les reponses", error}))
                        })
                    }
                })
            res.status(201).json({message: 'Question ALZ enregistré !'})
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({erreur: "Il manque une KEY questionALZ", error});
        })
};

// exports.getQuestionDMLAById = (req, res) => {
//     QuestionDMLA.findOne({_id: req.params.idQuestionDMLA})
//         .then(question => res.status(200).json(question))
//         .catch(error => res.status(404).json({erreur: "Cette question n'a pas été enregistré", error}));
//
//     // QuestionDMLA.findOne({_id: req.params.idQuestionDMLA})
//     //     .then(question => {
//     //         AnswerDMLA.find({questionId: question._id})
//     //             .then(answerALZ => {
//     //                 console.log(question);
//     //                 answerALZ.forEach(a => {
//     //                     // console.log(a);
//     //                     question.answers.push(a);
//     //                     // console.log(question);
//     //                 })
//     //                 res.status(200).json(question);
//     //             })
//     //     })
//     //     .catch(error => res.status(404).json({erreur: "Cette question n'a pas été enregistré", error}));
// };
//
// exports.deleteQuestionDMLAById = (req, res) => {
//     console.log("ASK DEL QUESTION DMLA")
//     QuestionDMLA.deleteOne({_id: req.params.idQuestionDMLA})
//         .then(() => {
//             AnswerDMLA.deleteMany({questionId: req.params.idQuestionDMLA})
//                 .then(() => res.status(200).json({message: 'Question supprimé !'}))
//                 .catch(error => res.status(400).json({error}))
//         })
//         .catch(error => res.status(400).json({error}))
// };