const mongoose=require('mongoose');
const {Schema}=mongoose;
const cartSchema=new Schema(
      {
         userId:{type:String,require:true},  
         products:[
               {
                  productId:{type:String},
                  quentity:{type:Number,default:1}           
               }
         ]      
      },
      {timestamps:true}         
)
module.exports=mongoose.model('Cart',cartSchema);