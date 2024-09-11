
import jwt from "jsonwebtoken"
export const varifyToken =(req,res,next)=>{
    
    const token =req.cookies.jwt;
    // console.log(token)
    if(!token) return res.status(401).send("you are not authencated");
    jwt.verify(token,process.env.JWT_KEY, async (err,payload) => {
        if(err){
            res.status(403).send("token is in valid ")
        }
        req.userId= payload.userId;
        
        // console.log(req.userId)
        next();
        
    })
    

}