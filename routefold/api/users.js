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
                    newUser.pass = hash;
                    newUser .save()
                    .then(user=> res.json(user))
                    .catch(err => console.log(err));
                })
            }) 
        }
    })
})


router.post("/login", (req, res)=>{
    const {error, isValid} = validateLoginInput(req.body);

    if(!isValid){
        return res.status(400).json(error);
    }
    const email = req.body.email;
    const pass = req.body.pass;

    User.findOne({email}).then(user=>{
        if(!user){
            return res.status(404).json({emailnotfound: "email registered nhi hai, aaj hi register kare, janhit me jaari"});

        }

        bcrypt.compare(pass, user.pass).then(isMatch =>{
            if(isMatch){
                const payload = {
                    id: user.id,
                    name: user.name,
                };
        

            jwt.sign(
                payload,
                keys.secretKey,
                {
                    expiresIn: 32000000
                },
                (err, token)=>{
                    res.json({success: true,
                    token: "Bearer "+ token});
                }
            );
            } else{
                return res.status(400)
                .json({passincorrect: "galat password hai"});
            }
        

        })
    })


})


module.exports = router;