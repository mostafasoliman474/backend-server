const express=require('express');
const app = express();
const mongoDB=require('mongoose');
const dotenv=require('dotenv');
const authRouter=require('./routes/auth')
const userRouter=require('./routes/user');
const productRouter=require('./routes/product')
const cartRouter=require('./routes/cart')
const orderRouter=require('./routes/order')
const checkoutRouter=require('./routes/stripe')
const cors=require("cors");
app.use(cors())
app.use(express.json())
app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);
app.use('/api/product',productRouter);
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter);
app.use('/api/checkout',checkoutRouter);
dotenv.config();
mongoDB.connect(process.env.MONGOO_URL).then(()=>{
     console.log('DB connection successfully')          
}).catch((err)=>{
     console.log(err)          
})
app.get('/api/test',(req,res)=>{
     res.send('Test run successfully')          
})
app.listen(5000||process.env.PORT,()=>{
   console.log('Test running successfully')
}) 