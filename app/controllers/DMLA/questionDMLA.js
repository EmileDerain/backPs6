const QuestionDMLA = require('../../models/DMLA/questionDMLA');
const AnswerDMLA = require('../../models/DMLA/answerDMLA');


exports.createQuestionDMLA = (req, res) => {
    console.log("req.body", req.body)

    const quizDMLA = new QuestionDMLA({
        label: req.body.label,
        quizId: req.params.idQuizDMLA,
        // answers: req.body.answers,
    });

    quizDMLA.save()
        .then(() => {
            QuestionDMLA.findOne({quizId: req.params.idQuizDMLA, label: req.body.label})
                .then(question => {
                    if (req.body.answers !== undefined){
                        req.body.answers.forEach(a => {
                            const answerDMLA = new AnswerDMLA({
                                value: a.value,
                                questionId: question._id,
                                isCorrect: a.isCorrect,
                            });
                            answerDMLA.save()
                                .then()
                                .catch(error => res.status(404).json({erreur: "Erreur dans les reponses", error}))
                        })
                    }
                })
            res.status(201).json({message: 'Question enregistré !'})
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({erreur: "Il manque une KEY questionDMLA", error});
        })
};

exports.getQuestionDMLAById = (req, res) => {
    QuestionDMLA.findOne({_id: req.params.idQuestionDMLA})
        .then(question => res.status(200).json(question))
        .catch(error => res.status(404).json({erreur: "Cette question n'a pas été enregistré", error}));

    // QuestionDMLA.findOne({_id: req.params.idQuestionDMLA})
    //     .then(question => {
    //         AnswerDMLA.find({questionId: question._id})
    //             .then(answerALZ => {
    //                 console.log(question);
    //                 answerALZ.forEach(a => {
    //                     // console.log(a);
    //                     question.answers.push(a);
    //                     // console.log(question);
    //                 })
    //                 res.status(200).json(question);
    //             })
    //     })
    //     .catch(error => res.status(404).json({erreur: "Cette question n'a pas été enregistré", error}));
};

exports.deleteQuestionDMLAById = (req, res) => {
    console.log("ASK DEL QUESTION DMLA")
    QuestionDMLA.deleteOne({_id: req.params.idQuestionDMLA})
        .then(() => {
            AnswerDMLA.deleteMany({questionId: req.params.idQuestionDMLA})
                .then(() => res.status(200).json({message: 'Question supprimé !'}))
                .catch(error => res.status(400).json({error}))
        })
        .catch(error => res.status(400).json({error}))
};