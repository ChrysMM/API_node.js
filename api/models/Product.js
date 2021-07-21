const mongoose = require('mongoose');
//on récupère le composant Schema de mongoose pour générer un schema de données
const Schema = mongoose.Schema;

//on définit désormais notre schema pour notre collection product
const product = new Schema(
    {
        //on définit d'abord nos propriétés
        name: {
            type: String
        },
        description: {
            type: String
        },
        price: {
            type: Number
        }
    }, {
        //on définit dans quelle collection on stockera ce schéma
        collection: 'product'
    }
);


//mongoose.model récupère le schema ainsi que le futur nom du modèle pour créer le modèle de données
module.exports = mongoose.model('product', product);
