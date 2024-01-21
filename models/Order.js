const mongoose=require('mongoose');
const {Schema}=mongoose;
const orderSchema=new Schema(
      {
         userId:{type:String,require:true},  
         products:[
               {
                  productId:{type:String},
                  quentity:{type:Number,default:1}           
               }
         ],
         amount: { type: Number, required: true },
         address: { type: Object, required: true },
         status: { type: String, default: "pending" },      
      },
      {timestamps:true}         
)
module.exports=mongoose.model('Order',orderSchema);