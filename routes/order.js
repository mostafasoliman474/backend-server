const Order = require('../models/Order');
const { verifiTokenAndAuthentication, verifiTokenAndAdmin, verifiToken } = require('./verifiToken');

const router = require('express').Router();
//CREATE Order
router.post('/', verifiToken, async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();

    res.status(200).json(savedOrder)
  } catch (error) {
    res.status(500).json(error)
  }
});
//UPDATE ORDER
router.put('/:id', verifiTokenAndAuthentication, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id,
      { $set: req.body },
      { new: true })
    res.status(200).json(updatedOrder)

  } catch (error) {
    res.status(503).json(error)
  }
})
//DELETE ORDER
router.delete('/:id', verifiTokenAndAuthentication, async (req, res) => {

  try {
    await Order.findByIdAndDelete(req.params.id)
    res.status(200).json("Order has been deleted... ")
  } catch (error) {
    res.status(500).json(error)
  }
})
//GET ORDER
router.get('/find/:userId', verifiTokenAndAuthentication, async (req, res) => {

  try {
    const foundedOrder = await Order.findById({ userId: req.params.userId })

    res.status(200).json(foundedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
})
//GET USERS ORDERS 
router.get("/", verifiTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
})
//MY INCOME
router.get('/income', verifiTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(date.getMonth() - 1));
  try {
    const orders = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount"
        },
      },
      {
        $group:{
          _id:"$month",
          total:{$sum:"$sales"}
      }
      } 
      ])
       res.status(200).json(orders);       
     } catch (error) {
  res.status(500).json(error);
}          
})
module.exports = router;