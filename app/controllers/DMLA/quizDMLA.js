const QuizDMLA = require('../../models/DMLA/quizDMLA');
const QuestionDMLA = require('../../models/DMLA/questionDMLA');
const AnswerDMLA = require('../../models/DMLA/answerDMLA');


exports.createQuizDMLA = (req, res) => {
    console.log("JE CREE UN QUIZDMLA")
    const quizDMLA = new QuizDMLA({
        theme: req.body.theme,
        name: req.body.name,
        questions: [],
    });
    quizDMLA.save()
        .then(() => res.status(201).json({message: 'Quiz enregistré !'}))
        .catch(error => {
            console.log(error);
            res.status(400).json({erreur: "Il manque une KEY quizDMLA", error});
        })
};

exports.getQuizDMLAById = (req, res) => {
    QuizDMLA.findOne({_id: req.params.idQuizDMLA})
        .then(quiz => {
            QuestionDMLA.find({quizId: quiz._id})
                .then(question => {
                    const nbQuestion = question.length;

                    question.forEach(q => {
                        AnswerDMLA.find({questionId: q._id})
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
        .catch(error => res.status(404).json({erreur: "Se quiz n'existe pas", error}));
};

exports.getAllQuizDMLA = (req, res) => {
    console.log("JE SUIS EN TRAIN DE GET ALLQUIZDMLA")
    QuizDMLA.find()
        .then(quiz => {
            const nbQuiz = quiz.length;
            var nbQuizAdd = 0;

            quiz.forEach(qu => {
                QuestionDMLA.find({quizId: qu._id})
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
        .catch(error => res.status(404).json({erreur: "Ces quiz n'existe pas", error}));
};

exports.getQuizDMLAByTheme = (req, res) => {
    console.log('QuizDMLA.find({theme: req.params.theme}): ', req.params.theme);
    QuizDMLA.find({theme: req.params.theme})
        .then(quiz => {
            const nbQuiz = quiz.length;
            var nbQuizAdd = 0;

            quiz.forEach(qu => {
                QuestionDMLA.find({quizId: qu._id})
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
        .catch(error => res.status(404).json({erreur: "Ces quiz n'existe pas", error}));
};

exports.putQuizDMLAById = (req, res) => {
    QuizDMLA.findOne({_id: req.params.idQuizDMLA})
        .then(quiz => {
            if (!quiz) {
                return res.status(401).json({message: 'Quiz non trouvé'});
            }
            quiz.updateOne({theme: req.body.theme, name: req.body.name})
                .then(() => {
                    res.status(201).json({message: "Quiz mise a jour"});
                })
                .catch(error => {
                    res.status(400).json({message: "Quiz pas mise a jour", error});
                });
        })
        .catch(error => res.status(500).json({message: 'Code erreur lX5', error}));
};

exports.deleteQuizDMLAById = (req, res) => {
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

    console.log("JE DELETE AnswerDMLA")

    QuestionDMLA.find({quizId: req.params.idQuizDMLA})
        .then(question =>
            question.forEach(q =>
                AnswerDMLA.deleteMany({questionId: q._id})
                    .then(a => console.log('a: ', a)) // () => res.status(200).json({message: 'Reponse des questions du quiz supprimé !'})
                    .catch(error => res.status(400).json({error}))
            ))
        .catch(error => res.status(400).json({error}))


    console.log("JE DELETE QuestionDMLA")
    QuestionDMLA.deleteMany({quizId: req.params.idQuizDMLA})
        .then(q => console.log(q)) //() => res.status(200).json({message: 'Question du quiz supprimé !'})
        .catch(error => res.status(400).json({error}))

    console.log("JE DELETE QuizDMLA")
    QuizDMLA.deleteOne({_id: req.params.idQuizDMLA})
        .then(() => res.status(200).json({message: 'Quiz supprimé !'}))
        .catch(error => res.status(400).json({error}));
};