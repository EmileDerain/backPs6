const QuizGame = require('../models/quizGame')

exports.createQuizGameDMLA = (req, res) => {
    const quizGame = new QuizGame({
        type: "DMLA",

        quizId: req.body.quizId,
        correctAnswers: 0,
        incorrectAnswers: 0,

        userId: req.body.userId,
        answers: [],
    });
    quizGame.save()
        .then((quiz) => {
            console.log(quiz);
            res.status(201).json(quiz)  //{message: 'Partie DMLA enregistré !', quiz}
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({erreur: "Il manque une KEY quizGame", error});
        })
};

exports.createQuizGameALZ = (req, res) => {
    const quizGame = new QuizGame({
        type: "ALZ",

        quizId: req.body.quizId,
        correctAnswers: 0,
        incorrectAnswers: 0,

        userId: req.body.userId,
        answers: [],
        nbRepetition: req.body.nbRepetition,
    });
    quizGame.save()
        .then((quiz) => res.status(201).json(quiz)) // {message: 'Partie ALZ enregistré !'}
        .catch(error => {
            console.log(error);
            res.status(400).json({erreur: "Il manque une KEY quizGame", error});
        })
};


exports.getQuizGameById = (req, res) => {
    QuizGame.findOne({_id: req.params.idQuizGame})
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({erreur: "Ces quizGame n'existe pas", error}));
};

exports.getQuizGameByIdUser = (req, res) => {
    QuizGame.find({userId: req.params.idU})
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({erreur: "Ces quizGame n'existe pas", error}));
};


exports.getAllQuizGame = (req, res) => {
    QuizGame.find()
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({erreur: "Ces quizGame n'existe pas", error}));
};

exports.putQuizGameById = (req, res) => {
    console.log("req.params.idQuizGame :", req.params.idQuizGame);

    QuizGame.findOne({_id: req.params.idQuizGame})
        .then(quizGame => {
            console.log("TEST: ", quizGame)
            if (!quizGame) {
                return res.status(401).json({message: 'QuizGame non trouvé'});
            }

            console.log("TEST1: ", quizGame.answers)
            var answerVar = quizGame.answers;
            console.log("TEST2: ", answerVar)
            if (req.body.answers !== undefined) {
                answerVar.push(req.body.answers);
                console.log("TEST3: ", answerVar)
            }

            // var correctAnswersVar = quizGame.correctAnswers;
            // if (req.body.correctAnswers !== undefined) {
            //     correctAnswersVar = correctAnswersVar + req.body.correctAnswers;
            //     console.log("TEST4: ", correctAnswersVar)
            // }
            //
            // var incorrectAnswersVar = quizGame.incorrectAnswers;
            // if (req.body.incorrectAnswers !== undefined) {
            //     incorrectAnswersVar = incorrectAnswersVar + req.body.incorrectAnswers;
            //     console.log("TEST5: ", incorrectAnswersVar)
            // }
            if (req.body.answers === undefined) {
                quizGame.updateOne({
                    correctAnswers: req.body.correctAnswers, //correctAnswersVar
                    incorrectAnswers: req.body.incorrectAnswers,  //incorrectAnswersVar
                })
                    .then(() => {
                        console.log('quizGame: ', quizGame);
                        res.status(201).json({message: "QuizGame mise a jour", quizGame});
                    })
                    .catch(error => {
                        res.status(400).json({message: "QuizGame pas mise a jour", error});
                    })
            };
        })
        .catch(error => res.status(500).json({message: 'Code erreur QGx1', error}));
};
