const User =require('../models/User')
const { verifiTokenAndAuthentication, verifiTokenAndAdmin } = require('./verifitoken');
const router = require('express').Router();
//UPDATE USER
router.put('/:id', verifiTokenAndAuthentication, async (req, res) => {
   if (req.body.password) {
      req.body.password = cryptoJs.AES.encrypt(
         req.body.password,
         process.env.SECRET
      ).toString()
   }
   try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id,
         {
            $set: req.body,
         }, {
         new: true
      }
      );
      res.status(201).json(updatedUser);
   } catch (error) {
      res.status(500).json(error)
   }
})
//DELETE USER
router.delete('/:id', verifiTokenAndAdmin, async (req, res) => {
   try {
      await User.findByIdAndDelete(
         req.params.id
      )
      res.status(200).json('User has been deleted...')
   } catch (error) {
      console.log(error)
      res.status(500).json(error)
   }
})
//Get USER
router.get('/find/:id', verifiTokenAndAdmin, async (req, res) => {
   try {
      const user = await User.findById(
         req.params.id
      )
      res.status(200).json(user);
   } catch (error) {
      res.status(500).json(error)
   }
})
router.get('/', verifiTokenAndAdmin, async (req, res) => {
   try {
      const query = req.query.new;

      const user = query ? await User.find().sort({ _id: -1 }).limit(5) : await User.find()
      res.status(200).json(user);
   } catch (error) {
      res.status(500).json(error)
   }
})
router.get('/stats' , verifiTokenAndAdmin,async(req,res)=>{
   const date = new Date()
   const lastYear= new Date(date.setFullYear(date.getFullYear()-1))
   try {
        const data = await User.aggregate([
             { $match: { createdAt: { $gte: lastYear } } },
             {
               $project: {
                 month: { $month: "$createdAt" },
               },
             },
             {
               $group: {
                 _id: "$month",
                 total: { $sum: 1 },
               },
             },
           ]);
        res.status(200).json(data)
        
   } catch (error) {
        res.status(500).json(error)
   }
})


module.exports = router;