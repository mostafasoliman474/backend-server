const Cart = require('../models/Cart');
const { verifiTokenAndAuthentication, verifiTokenAndAdmin } = require('./verifiToken');

const router = require('express').Router();
//CREATE CART
router.post('/', verifiTokenAndAuthentication, async (req, res) => {
               const newCart = new Cart(req.body);
               try {
                              const savedCart = await newCart.save();

                              res.status(200).json(savedCart)
               } catch (error) {
                              res.status(500).json(error)
               }
});
//UPDATE CART
router.put('/:id', verifiTokenAndAuthentication, async (req, res) => {
               try {
                              const updatedCart = await Cart.findByIdAndUpdate(req.params.id,
                                             { $set: req.body },
                                             { new: true })
                              res.status(200).json(updatedCart)

               } catch (error) {
                              res.status(503).json(error)
               }
})
//DELETE CART
router.delete('/:id', verifiTokenAndAuthentication, async (req, res) => {

               try {
                              await Cart.findByIdAndDelete(req.params.id)
                              res.status(200).json("Product cart has been deleted... ")
               } catch (error) {
                              res.status(500).json(error)
               }
})
//GET Cart
router.get('/find/:userId', verifiTokenAndAuthentication, async (req, res) => {

               try {
                              const foundedCart = await Cart.findById({ userId: req.params.userId })

                              res.status(200).json(foundedCart);
               } catch (error) {
                              res.status(500).json(error);
               }
})
//GET USERS CARTS 
router.get("/", verifiTokenAndAdmin, async (req, res) => {
               try {
                              const carts = await Cart.find();
                              res.status(200).json(carts);
               } catch (error) {
                              res.status(500).json(error);
               }
})
module.exports=router;