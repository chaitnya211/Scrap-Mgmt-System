const mongoose = require("mongoose")

mongoose.connect('mongodb+srv://chaitnya:Chaitnya123@cluster0.3dvs60y.mongodb.net/?retryWrites=true&w=majority');

mongoose.connection.on('error',err => {
    console.log("connection to database failed!");
});

mongoose.connection.on('connected',connected => {
    console.log("connected with database successfully.");
});


