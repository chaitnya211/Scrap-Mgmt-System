const express = require('express');
const buy_product_route = express.Router();
const mongoose = require('mongoose');
const buy_product = require('../model/buyProductModel');

const bodyParser = require('body-parser');

buy_product_route.use(bodyParser.json());
buy_product_route.use(bodyParser.urlencoded({extended: true}));

buy_product_route.post('/',async function(req,res,next){
    
    try {
        const buyProduct = new buy_product ({
            _id: new mongoose.Types.ObjectId,    
            product_name: req.body.product_name,
            product_category: req.body.product_category,
            product_transaction_id: req.body.product_transaction_id            
        });
        // console.log(buyProduct);
        const buyProductData = await buyProduct.save();

        res.status(200).send({
            success: true,
            msg: "Buy product detail.",
            data: buyProductData
        });

    }
    catch (error) {
        res.status(400).send({
            success: false,
            msg: error.message
        })
    }

});

buy_product_route.get('/', async function(req,res,next){
    buy_product.find()
    .then(result => {
        res.json({
            newProductData: result
        })
    })
    .catch(err => {
        console.log(err);
        res.json({
            error: err
        });
    });
});

module.exports = buy_product_route;