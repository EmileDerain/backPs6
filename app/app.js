const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors')

const quizDMLARoute = require("./routes/quizDMLA/quizDMLA")
const quizGameRoute = require("./routes/quizGame/quizGame")
const userRoute = require("./routes/user/user")
const quizALZRoute = require("./routes/quizALZ/quizALZ")

mongoose.connect('mongodb+srv://Emile:ahHddLsjvEk5k9qk@firstcluster.qbx9t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Add headers before the routes are defined
app.use(cors())

app.use("/api/quizzesALZ", quizALZRoute);
app.use("/api/quizzesDmla", quizDMLARoute);
app.use("/api/quizGames", quizGameRoute);
app.use("/api/user", userRoute);

module.exports = app;
