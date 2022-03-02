require('dotenv').config()
const express = require("express");
const jwt = require("jsonwebtoken");
const router  = express.Router();
const User = require("../models/User")

//for encryption
const CryptoJS = require("crypto-js");

//Register
router.post("/register", async (req,res)=>{

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password , process.env.SECRET).toString(),
    });

    try{
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch(err){
        res.status(500).json(err); 
    }
    


});

router.post("/login", async(req,res)=>{

    try{
        const user = await User.findOne({username: req.body.username });
        !user && 
            res.status(401).json("Wrong Crediantials")

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET);
        const Originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        Originalpassword !== req.body.password && 
            res.status(401).json("Wrong Crediantials");

        //jwt
        const accessToken = jwt.sign({
            id:  user._id,
            isAdmin: user.isAdmin,
        }, 
        process.env.JWT_SEC,
        {expiresIn: "3d"}
        );

        const {password, ...others} = user._doc;

        //if everything verified return user
         res.status(200).json({...others,accessToken});
    } catch(err){
         res.status(500).json(err);
    }

});



//exporting
module.exports = router