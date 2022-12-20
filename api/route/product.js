const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../model/product');
const checkAuth = require('../middleware/check-auth');
// const cloudinary = require('cloudinary').v2;

// cloudinary.config({ 
//     cloud_name: 'dnk4s5bsx', 
//     api_key: '686853229586754', 
//     api_secret: 'u7uHIURu6lugw9ht8iX3gT7NX3c',
//     // secure: true
//   });


router.get('/',(req,res) => {
    Product.find()
    .then(result => {
        // console.log(result);
        res.json({
            productData : result
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.get('/:id',(req,res) => {
    Product.findById(req.params.id)
    .then(result => {
        res.status(200).json({
            DataById: result
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
})

router.post('/',(req,res) => {
    
    console.log(req.body);
    // const file = req.files.photo;
    // cloudinary.uploader.upload(file.tempFilePath,(err,result) => {
    //     console.log(result);
    // })

    const product = new Product({
        _id: new mongoose.Types.ObjectId,
        code: req.body.code,
        title: req.body.title,
        description: req.body.description,
        mrp: req.body.mrp,
        sp: req.body.sp,
        discountPercent: req.body.discountPercent,
        // imagePath: req.body.imagePath,
        category: req.body.category
    });

    product.save()
    .then(result => {
        console.log(result);
        res.json({
            newProduct: result
        })
    })
    .catch (err => {
        console.log(err)
        res.status(500).json({
            error: err
        });
    });
});

router.delete('/:id',checkAuth,(req,res) => {
    Product.remove({_id: req.params.id})
    .then(result => {
        res.json({
            message: "Data deleted successfully."
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});


// axios.post(obj, (res)=>{

// })
// router.put('/:id',(req,res) => {
//     console.log(req.params.id);
//     Product.findOneAndUpdate({_id: req.params.id}, {

//     })
// })


module.exports = router;