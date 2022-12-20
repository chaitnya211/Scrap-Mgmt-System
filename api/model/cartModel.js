const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    product_id: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        require: true
    },
    pname: {
        type: String,
        required: true
    },
    transaction_id: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('cart',cartSchema);
