const express = require('express');
const cart_route = express();
const bodyParser = require('body-parser');
const cart = require('../model/cartModel');
// const cart = require('../controller/cartController');

cart_route.use(bodyParser.json());
cart_route.use(bodyParser.urlencoded({extended:true}));

// const checkAuth = require('../middleware/check-auth');

cart_route.get('/add-to-cart',(req,res) => {
    cart.find()
    .then(result => {
        // console.log(result);
        res.json({
            cartData : result
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
})

const add_to_cart = async (req,res) => {

    try {
        const cart_obj = new cart({
            product_id: req.body.product_id,
            price: req.body.price,
            pname: req.body.pname,
            transaction_id: req.body.transaction_id
        });

        const cartData = await cart_obj.save()
        .then(result => {
            console.log(result);
            res.json({
                cartData: result
            })
        })

    }
    catch(error) {
        res.status(500).json({
            message: error
        });
    }
}

    cart_route.post('/add-to-cart', add_to_cart);

module.exports = add_to_cart