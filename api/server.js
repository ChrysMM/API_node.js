const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
//module de routes
const helloRoutes = require('./routes/helloworld.route');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true }).then(
    //si tout se passe bien
    () => console.log('db connected'),
    //en cas d'erreur
    err => console.error(`db error ${err}`)
);
const app = express(); //on instancie Express
const port = 4000; //on définit un port d'écoute pour notre serveur

app.use(bodyParser.json());
app.use(cors());
app.use('/', helloRoutes);

const server = app.listen(port, () => { console.log('serveur lancé sur le port ' + port) })
