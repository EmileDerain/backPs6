const AnswerDMLA = require('../../models/DMLA/answerDMLA');

exports.createAnswerDMLA = (req, res) => {
    console.log(req.params.idQuestionDMLA);
    const answerDMLA = new AnswerDMLA({
        value: req.body.value,
        questionId: req.params.idQuestionDMLA,
        isCorrect: req.body.isCorrect,
    });
    answerDMLA.save()
        .then(() => res.status(201).json({message: 'Reponse enregistré !'}))
        .catch(error => {
            console.log(error);
            res.status(400).json({erreur: "Il manque une KEY ReponseDMLA", error});
        })
};

exports.getAnswerDMLAById = (req, res) => {
    // console.log('LOG(getOneBonPlan): ', req.params.id);
    AnswerDMLA.findOne({_id: req.params.idAnswerDMLA})
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({erreur: "Cette reponse n'a pas été enregistré", error}));
};
