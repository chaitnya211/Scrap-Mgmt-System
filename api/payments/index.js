const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');

const PUBLISHIBLE_KEY = "pk_test_51MG45dSCUX4yybYsVASg2y9n5s7EBTGA7AD16TnZi50IstdzBTwff1VJ9bPbAvoJaqewjYk6Ghvsg5oZeS7Q7EhM00FRUgPMmk";
const SECREAT_KEY = "sk_test_51MG45dSCUX4yybYs2TtizcryxVrUqODqQ3AUTVY044P4Zy3XSLRXrCxsWEXdjcasVLukIKOxaVJW6Jwk7MukWTsv00DiUKUOdI";
const stripe = require('stripe')(SECREAT_KEY);

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
app.set("view engine" ,"ejs" );



app.get('/' , (req,res) => {
     res.render('Home',{
        key:PUBLISHIBLE_KEY,

     })
})

app.post('/payment', function(req, res){
 
    // Moreover you can take more details from user
    // like Address, Name, etc from form
    stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken,
    name: 'Sojwal Ingle',
    address: {
    line1: 'TC 9/4 Old MES colony',
    postal_code: '110092',
    city: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    }
    })
    .then((customer) => {
     
    return stripe.charges.create({
    amount: 7000, // Charing Rs 25
    description: 'Web Development Product',
    currency: 'USD',
    customer: customer.id
    });
    })
    .then((charge) => {
    res.send("Success") // If no error occurs
    })
    .catch((err) => {
    res.send(err) // If some error occurs
    });
    })

app.listen(3000 , function(req,res){
    console.log(`App is runnig on ${PORT}`);
})