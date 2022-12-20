const mongoose = require('mongoose');

const buyProductSchema = mongoose.Schema({
    product_name:{
        type: String,
        required: true
    },
    product_category:{
        type: String,
        required:true
    },
    product_transaction_id: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("buyProduct",buyProductSchema);