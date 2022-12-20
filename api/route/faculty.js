const express = require("express");
const router = express.Router();

router.get('/',function(req,res){
    res.status(200).json({
        message: "This is faculty get request."
    });
});

router.post('/',function(req,res){
    res.json({
        message: "This is faculty post request."
    });
});

module.exports = router;