const JWT=require('jsonwebtoken');
const verifiToken =(req,res,next)=>{
     const authHeaders=req.headers.token;
     if(authHeaders){
          const token=authHeaders.split(' ')[1];
          JWT.verify(token,process.env.JWT_SECRET,(err,user)=>{
               if(err) res.status(403).json('Token not err') 
               req.user=user;
               next();
          })     
     }else{
          return res.status(401).json('You are not authenticatied');       
     }          
}
const verifiTokenAndAuthentication=(req,res,next)=>{
   verifiToken(req,res,()=>{
     if(req.user.id===req.params.id||req.user.isAdmin){
       next();     
     } else {
       res.status(403).json("You aren't allow to do this")
     }  
   })
            
}
const verifiTokenAndAdmin=(req,res,next)=>{
   verifiToken(req,res,()=>{
     if(req.user.isAdmin){
       next();     
     } else {
       res.status(403).json("You aren't allow to do this")
     }  
   })
            
}

module.exports={verifiToken,verifiTokenAndAuthentication,verifiTokenAndAdmin}