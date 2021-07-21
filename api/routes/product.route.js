const express = require('express');
const router = express.Router();

//le model product pour pouvoir faire des requêtes mongodb
let Product = require('../models/Product');

//on définit ensuite nos routes

router.route('/').get((req, res) => {

    Product.find( (err, products) => {
        //en cas d'erreur
        if (err) {
            res.status(500).json({ message: `Error retrieving products : ${err}`});
        }
        //si on a bien reçu les produits
        else {

            res.json(products);
        }
    });
});

// l'ajout de products
//  HTTP POST
router.route("/").post((req, res) => {

    //new Product() permet de créer un nouvel objet selon le model Product de mongoose
    const product = new Product(req.body);

    product.save()
    .then(
        //on définit quoi faire en cas de réussite
        product => res.json(product)
    )
    //si une erreur arrive on le gère dans le .catch() de la promise
    .catch(
        err => res.json({message: `Unable to save product to database : ${err}`})
    );
});
//pour aller chercher un product en particulier
router.route("/:id").get((req, res) => {

    const id = req.params.id;
    //  la ressource associée en bdd
    Product.findById(id, (err, product) => {

        if (err) {
            //on envoie un message d'erreur en console
            //ici on part du principe que l'erreur viendra du serveur
            //mais on devrait d'abord vérifier en temps normal au lieu de supposer
            //TODO : filtrer correctement le type d'erreur
            res.status(500).json({
                message: `Error retrieving product : ${err}`,
            });
        } else {

            if (product) {
                res.json(product);
            } else {
                res.status(404).json({ message: `Product ${id} not found` });
            }
        }
    });
});

router.route("/:id").delete((req, res) => {

    const id = req.params.id;

    Product.findByIdAndDelete(id, (err, product) => {
        if (err) {
            res.status(500).json({
                message: `Error deleting product ${id} : ${err}`,
            });
        } else {
            if (product) {
                res.json({ message: `Product ${id} successfuly deleted` });
            } else {
                res.status(404).json({ message: `Product ${id} not found` });
            }
        }
    });
});

router.route("/:id").put((req, res) => {
    const id = req.params.id;
    Product.findByIdAndUpdate(id, req.body, {new: true} ,(err, product) => {
        if (err) {
            res.status(500).json({
                message: `Error updating product ${id} : ${err}`
            })
        } else {
            if (product){
                res.json(product)
            } else {
                res.status(404).json({message: `Product ${id} not found`});
            }
        }
    })
});


module.exports = router;
