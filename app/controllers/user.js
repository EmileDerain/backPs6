const User = require('../models/user');

exports.createUser = (req, res) => {
    const user = new User({
        picture: req.body.picture,
        name: req.body.name,
        type: req.body.type,
    });
    user.save()
        .then(() => res.status(201).json({message: 'User enregistré !'}))
        .catch(error => {
            console.log(error);
            res.status(400).json({erreur: "Il manque une KEY user", error});
        })
};

exports.getAllUser = (req, res) => {
    User.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({error}));
};


exports.deleteUserById = (req, res) => {
    User.deleteOne({_id: req.params.idUser})
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({error}));
};

exports.getUserById = (req, res) => {
    User.findOne({_id: req.params.idUser})
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({error}));
};