const Product =require('../models/Product')
const { verifiTokenAndAuthentication, verifiTokenAndAdmin } = require('./verifitoken');
const router = require('express').Router();

//CREATE PRODUCT

router.post('/',verifiTokenAndAdmin,async(req,res)=>{
     const newProduct=new Product(req.body);
     try {
       const savedProduct= await newProduct.save(); 
       res.status(200).json(savedProduct)        

     } catch (err) {
       res.status(500).json(err)        
     }          
})

//UPDATE USER
router.put('/:id', verifiTokenAndAdmin, async (req, res) => {
   try {
      const updatedProduct = await Product.findByIdAndUpdate(req.params.id,
         {
            $set: req.body,
         }, {
         new: true
      }
      );
      res.status(201).json(updatedProduct);
   } catch (error) {
      res.status(500).json(error)
   }
})
//DELETE PRODUCT
router.delete('/:id', verifiTokenAndAdmin, async (req, res) => {
   try {
      await Product.findByIdAndDelete(
         req.params.id
      )
      res.status(200).json('Product has been deleted...')
   } catch (error) {
      console.log(error)
      res.status(500).json(error)
   }
})
//Get PRODUCT
router.get('/find/:id', async (req, res) => {
   try {
      const product = await Product.findById(
         req.params.id
      )
      res.status(200).json(product);
   } catch (error) {
               console.log(error)
      res.status(500).json(error)
   }
})
//GET ALL PRODUCT
router.get('/', async (req, res) => {
   const Nquery = req.query.new;
   const Cquery = req.query.category;
   try {
      let products;
      if(Nquery){
         products= await Product.find().sort({ createdAt: -1 }).limit(2)
      }
      else if(Cquery){
         products= await Product.find({categories:{
            $in:[Cquery]
         }})
      }
      else{
         products=await Product.find();
      }
      // const products = Nquery ? await Product.find().sort({ _id: -1 }).limit(5) : await Product.find()
      res.status(200).json(products);
   } catch (error) {
      res.status(500).json(error)
   }
})
module.exports = router;