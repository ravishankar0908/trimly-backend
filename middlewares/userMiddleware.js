import jwt from "jsonwebtoken"
import env from "dotenv";
export const userAuthourization = (req, res, next)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if(token == null) return res.status(404).json({
        message: "Invalid Token or token is missing."
    })

    jwt.verify(token, process.env.jwt_secret_key,(err, user)=>{
        if(err) return res.status(404).json({message: err.message})
        req.user = user
        next();
    });

}