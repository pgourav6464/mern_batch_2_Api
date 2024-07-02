import jwt from "jsonwebtoken"
import { User } from "../Models/User.js"

export const isAuthanticate = async(req,res,next)=>{
    const token = req.header("auth")

    if(!token){return res.json({message:"login first" ,success:false})}

    try {
        const varifytoken = jwt.verify(token ,process.env.Jwt)
        const userId = varifytoken.userId 
        const user = await User.findById(userId);
        if(!user)return res.json({message:"user not exist"})

        req.user = user
        next()
    } catch (error) {
        res.json({message:error.message})
    }
}