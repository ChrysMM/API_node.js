const express = require('express');
const app = express();

const router = express.Router();


//la requête HTTP et la réponse HTTP
router.route("/").get( (req, res) => {
    res.json({message: 'Hello, world !'});
})


module.exports = router;
