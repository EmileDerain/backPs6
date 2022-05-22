const QuizALZ = require('../../models/ALZ/quizALZ');
const QuestionALZ = require('../../models/ALZ/questionALZ');
const AnswerALZ = require('../../models/ALZ/answerALZ');


exports.createQuizALZ = (req, res) => {
    console.log("JE CREE UN QUIZALZ")
    const quizALZ = new QuizALZ({
        theme: req.body.theme,
        name: req.body.name,
        questions: [],

        nbRepetition: req.body.nbRepetition,
    });
    quizALZ.save()
        .then(() => res.status(201).json({message: 'Quiz LZ enregistré !'}))
        .catch(error => {
            console.log(error);
            res.status(400).json({erreur: "Il manque une KEY quizALZ", error});
        })
};

exports.getQuizALZById = (req, res) => {
    QuizALZ.findOne({_id: req.params.idQuizALZ})
        .then(quiz => {
            QuestionALZ.find({quizId: quiz._id})
                .then(question => {
                    const nbQuestion = question.length;

                    question.forEach(q => {
                        AnswerALZ.find({questionId: q._id})
                            .then(answer => {

                                q.answers = answer,
                                    quiz.questions.push(q)

                                if (quiz.questions.length === nbQuestion) {
                                    res.status(200).json(quiz);
                                }
                            })
                    })
                    if (nbQuestion === 0) {
                        res.status(200).json(quiz);
                    }
                })
        })
        .catch(error => res.status(404).json({erreur: "Se quizALZ n'existe pas   3434", error}));
};

exports.getAllQuizALZ = (req, res) => {
    console.log("JE SUIS EN TRAIN DE GET ALLQUIZALZ")
    QuizALZ.find()
        .then(quiz => {
            const nbQuiz = quiz.length;
            var nbQuizAdd = 0;

            quiz.forEach(qu => {
                QuestionALZ.find({quizId: qu._id})
                    .then(question => {
                        qu.questions = question;
                        nbQuizAdd = nbQuizAdd + 1;

                        if (nbQuizAdd === nbQuiz) {
                            res.status(200).json(quiz);
                        }

                    })
            })

            if (nbQuiz === 0) {
                res.status(200).json(quiz);
            }
        })
        .catch(error => res.status(404).json({erreur: "Ces quiz ALZ n'existe pas", error}));
};

exports.getQuizALZByTheme = (req, res) => {
    console.log('QuizDMLA.find({theme: req.params.theme}): ', req.params.theme);
    QuizALZ.find({theme: req.params.theme})
        .then(quiz => {
            const nbQuiz = quiz.length;
            var nbQuizAdd = 0;

            quiz.forEach(qu => {
                QuestionALZ.find({quizId: qu._id})
                    .then(question => {
                        qu.questions = question;
                        nbQuizAdd = nbQuizAdd + 1;

                        if (nbQuizAdd === nbQuiz) {
                            res.status(200).json(quiz);
                        }

                    })
            })

            if (nbQuiz === 0) {
                res.status(200).json(quiz);
            }
        })
        .catch(error => res.status(404).json({erreur: "Ces quiz ALZ n'existe pas", error}));
};

// exports.putQuizDMLAById = (req, res) => {
//     QuizDMLA.findOne({_id: req.params.idQuizDMLA})
//         .then(quiz => {
//             if (!quiz) {
//                 return res.status(401).json({message: 'Quiz non trouvé'});
//             }
//             quiz.updateOne({theme: req.body.theme, name: req.body.name})
//                 .then(() => {
//                     res.status(201).json({message: "Quiz mise a jour"});
//                 })
//                 .catch(error => {
//                     res.status(400).json({message: "Quiz pas mise a jour", error});
//                 });
//         })
//         .catch(error => res.status(500).json({message: 'Code erreur lX5', error}));
// };

exports.deleteQuizALZById = (req, res) => {
    // QuizDMLA.deleteOne({_id: req.params.idQuizDMLA})
    //     .then(() => QuestionDMLA.deleteMany({quizId: req.params.idQuizDMLA})
    //         .then(question => {
    //                 console.log("question ", question)
    //                 question.forEach(q => {
    //                     console.log("q ", q)
    //
    //                     AnswerDMLA.deleteMany({questionId: q._id})
    //                         .then() //() => res.status(200).json({message: 'Reponse des questions du quiz supprimé !'})
    //                         .catch(error => res.status(400).json({error}))
    //                 })
    //             },
    //         ))
    //     // res.status(200).json({message: 'Question du quiz supprimé !'}))
    //     .catch(() => null) //error => res.status(400).json({error})

    console.log("JE DELETE AnswerALZ")

    QuestionALZ.find({quizId: req.params.idQuizALZ})
        .then(question =>
            question.forEach(q =>
                AnswerALZ.deleteMany({questionId: q._id})
                    .then(a => console.log('a: ', a)) // () => res.status(200).json({message: 'Reponse des questions du quiz supprimé !'})
                    .catch(error => res.status(400).json({error}))
            ))
        .catch(error => res.status(400).json({error}))


    console.log("JE DELETE QuestionDMLA")
    QuestionALZ.deleteMany({quizId: req.params.idQuizALZ})
        .then(q => console.log(q)) //() => res.status(200).json({message: 'Question du quiz supprimé !'})
        .catch(error => res.status(400).json({error}))

    console.log("JE DELETE QuizDMLA")
    QuizALZ.deleteOne({_id: req.params.idQuizALZ})
        .then(() => res.status(200).json({message: 'Quiz supprimé !'}))
        .catch(error => res.status(400).json({error}));
};