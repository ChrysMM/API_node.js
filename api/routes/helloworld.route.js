const express = require('express');
const app = express();

const router = express.Router();


//dans la fonction à exécuter, on reçoit deux paramètres : la requête HTTP et la réponse HTTP
router.route("/").get( (req, res) => {
    //on utilise l'objet réponse (res ici) pour envoyer nos données au format json
    res.json({message: 'Hello, world !'});
})


module.exports = router;
