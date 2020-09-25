const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/user')
const mongoose = require('mongoose')
const db="mongodb://localhost:27017/server"

mongoose.connect(db,err => {
    if(err){
        console.log('Error!'+err)
    }else{
        console.log('Connected to mongodb')
    }
})


router.get('/',(req,res)=>{
    res.send('From API Routes')
})

router.post('/register',(req,res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((error,registeredUser)=>{
        if(error){
            console.log(error)
        }
        else{
            let payload = {subject: registeredUser._id}
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({token})
        
        }
    })
})

router.post('/login',(req,res)=>{
    let userData = req.body
    User.findOne({email: userData.email},(error,user)=>{
        if(error){
            console.log(error)
        }else{
            if(!user){
                res.status(401).send('Invalid Email')
            }else
            if(user.password !== userData.password){
                res.status(401).send('Invalid Password')
            }else{
                let payload = {subject:user._id}
                let token = jwt.sign(payload,'secretKey')
                res.status(200).send({token})
            }
        }
    })
})
router.post('/event',(req,res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((error,events)=>{
        if(error){
            console.log(error)
        }
        else{
            res.status(200).send(events)
        
        }
    })
})

router.post("/event/:id", function(req,res){
    TestData.findById(req.params.id, function(err, theUser){
        if(err){
            console.log(err);
        } else {
            theUser.likes += 1;
            theUser.save();
            console.log(theUser.likes);
        }
    });
});





module.exports = router