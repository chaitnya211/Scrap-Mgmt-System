const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const studentRoute = require('./api/route/student');
const facultyRoute = require('./api/route/faculty');
const productRoute = require('./api/route/product');
const userRoute = require('./api/route/user');
const cartRoute = require('./api/route/cartRoute');
const fileUpload = require('express-fileupload');
const buy_product_route = require('./api/route/buyProductRoute');
require("./api/database/db");
const app = express();


app.use(fileUpload({
    useTempFiles:true
}))

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/student',studentRoute);
app.use('/faculty',facultyRoute);
app.use('/product',productRoute);
app.use('/user',userRoute);
app.use('/add-to-cart',cartRoute);
app.use('/buy-product',buy_product_route);


app.use((req,res,next) => {
    res.status(404).json({
        error: "bad request"
    });
});

module.exports = app;