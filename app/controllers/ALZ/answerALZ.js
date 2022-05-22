const AnswerALZ = require('../../models/ALZ/answerALZ');

exports.createAnswerALZ = (req, res) => {
    console.log(req.params.idQuestionALZ);
    const answerALZ = new AnswerALZ({
        value: req.body.value,
        questionId: req.params.idQuestionALZ,
        isCorrect: req.body.isCorrect,
    });
    answerALZ.save()
        .then(() => res.status(201).json({message: 'Reponse ALZ enregistré !'}))
        .catch(error => {
            console.log(error);
            res.status(400).json({erreur: "Il manque une KEY ReponseALZ", error});
        })
};

exports.getAnswerALZById = (req, res) => {
    // console.log('LOG(getOneBonPlan): ', req.params.id);
    AnswerALZ.findOne({_id: req.params.idAnswerALZ})
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({erreur: "Cette reponse n'a pas été enregistré", error}));
};
