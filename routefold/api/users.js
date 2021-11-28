const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const validateLoginInput = require('../../validate/login');
const validateRegisterInput = require('../../validate/register');

const User = require('../../model/userSchema');

router.post("/register", (req,res)=>{
    const {error, isValid} = validateRegisterInput(req.body);

    if(!isValid){
        return res.status(400).json(error);
    }

    User.findOne({email: req.body.email}).then(user=>{
        if(user){
            return res.status(200).json({email: "email registered hai"});
        } else{
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                pass: req.body.pass
            });


            bcrypt.genSalt(10, (err, salt)=>{
                bcrypt.hash(newUser.pass,salt,(err,hash)=>{
                    if(err) throw err;
                    newUser.pass = hash;
                    newUser .save()
                    .then(user=> res.json(user))
                    .catch(err => console.log(err));
                })
            }) 
        }
    })
})