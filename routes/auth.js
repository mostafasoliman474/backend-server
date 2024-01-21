const User = require('../models/User');
const router=require('express').Router();
const cryptoJS=require('crypto-js');
const JWT=require('jsonwebtoken')
router.post('/register',async(req,res)=>{
     const newUser= new User({
        username:req.body.username,       
        email:req.body.email,       
        password:cryptoJS.AES.encrypt(
               req.body.password,
               process.env.SECRET)
               .toString(),       
     }) 
     try {
       const savedUser=await newUser.save();        
       res.status(201).json(savedUser);     
     } catch (error) {
               console.log(error)
        res.status(500).json(error)       
     }         
})
router.post('/login',async(req,res)=>{
      try {
         const user=await User.findOne({
               username:req.body.username,
         })
         !user && res.status(401).json("user not found")
         const hashedpassword=cryptoJS.AES.decrypt(user.password,process.env.SECRET);
         const originalPassword=hashedpassword.toString(cryptoJS.enc.Utf8);
         const inputPassword=req.body.password; 
         originalPassword!=inputPassword && res.status(401).json('Password incorrect')
         const accessToken=JWT.sign(
            {
               id:user.id,
               isAdmin:user.isAdmin
            },
            process.env.JWT_SECRET,
            {
               expiresIn:'3d'
            }
         )
         const {password,...other}=user._doc;
         res.status(200).json({...other,accessToken});
      } catch (error) {
         console.log(error)
         res.status(500).json(error);    
      }         
})
module.exports=router