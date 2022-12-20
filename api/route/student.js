const express = require('express');
const router = express.Router();
const Student = require('../model/student');
const mongoose = require('mongoose');

router.get('/',function(req,res){
   Student.find()
   .then(result => {
    console.log(result);
    res.json({
        studentData: result
    })
   })
   .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
   });
});

// Show specific student info

router.get('/:id',(req,res,next) => {
    // console.log(req.params.id);
    Student.findById(req.params.id)
    .then(result => {
        res.json({
            DatabyId: result
        })
    })
    .catch (err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.post('/',function(req,res){
    const student = new Student({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        gender: req.body.gender
    });

    student.save()
    .then(result => {
        console.log(result);
        res.json({
            newStudent: result
        })
    })
    .catch (err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

//  Delete request ----------------

router.delete('/:id',(req,res,next) => {
    Student.remove({_id:req.params.id})
    .then(result => {
        res.json({
            message: "Student info deleted.",
            Deleted: result
        })
    })
    .catch (err => {
        console.log(err);
        res.status(500).json ({
            error: err
        });
    });
});



module.exports = router;