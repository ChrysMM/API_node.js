const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
//module de routes
const helloRoutes = require('./routes/helloworld.route');

const app = express(); //on instancie Express
const port = 4000; //on définit un port d'écoute pour notre serveur

app.use(bodyParser.json());
app.use(cors());
app.use('/', helloRoutes);

const server = app.listen(port, () => { console.log('serveur lancé sur le port ' + port) })

const mongoose = require('mongoose');
const db = require("./models");
const Role = db.role;

db.mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true }).then(
    //si tout se passe bien
    () => console.log('db connected'),
    //en cas d'erreur
    err => console.error(`db error ${err}`)
);

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}


