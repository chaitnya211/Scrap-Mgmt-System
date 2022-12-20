const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../model/user');
const bcrypt = require('bcrypt');
// const user = require('../model/user');
const jwt = require('jsonwebtoken');


// -----------------  optional (to get users list)---------------
router.get('/',(req,res) => {
    User.find()
    .then(result => {
        res.json({
            newUserData: result
        })
    })
    .catch(err => {
        console.log(err);
        res.json({
            error: err
        });
    });
});
// --------------------------------------------


router.post('/signup',(req,res) => {

    bcrypt.hash(req.body.password,10,(err,hash) => {
        if(err){
            res.status(500).json({
                error: err
            })
        }
        else{
            const user = new User ({
                _id: new mongoose.Types.ObjectId,
                username: req.body.username,
                password: hash,
                phone: req.body.phone,
                email: req.body.email,
                userType: req.body.userType
            })
        
            user.save()
            .then(result => {
                res.json({
                    newUser: result
                })
            })
            .catch(err => {
                console.log(err);
                req.status(500).json({
                    error: err
                });
            });
        }
    })

});


router.post('/login',(req,res) => {
    User.find({username: req.body.username})
    .exec()
    .then(user => {
        if(user.length < 1) {
            return res.status(401).json({
                message: "User does not exist."
            })
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result) => {
            if(!result) {
                res.status(401).json({
                    message: "Wrong password!!"
                })
            }
            if(result) {
                const token = jwt.sign({
                    username:user[0].username,
                    userType:user[0].userType,
                    email:user[0].email,
                    phone:user[0].phone
                },
                'this is dummy text',
                {
                    expiresIn:"24h"
                }
                );
                res.status(200).json({
                    username:user[0].username,
                    userType:user[0].userType,
                    email:user[0].email,
                    phone:user[0].phone,
                    token:token
                })
            }
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});




module.exports = router;