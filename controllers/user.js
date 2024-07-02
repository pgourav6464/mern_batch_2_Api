import { User } from "../Models/User.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


// register user
export const register = async (req,res)=>{
    const {name,email,password} = req.body
    try {
        let checkuser =  await User.findOne({email})
        console.log()
        if(checkuser){
    return res.json({message:"user already register" ,success:false})
}    let hashpass = await bcrypt.hash(password,10)
    let user = await User.create({name,email,password:hashpass})
        res.json({message:"user created" , success:true , user})
    } catch (error) {
        res.json({message:error})
    }
} 

// login user

export const login = async (req,res)=>{
    const {email,password} = req.body
    try {
        let user = await User.findOne({email})
        if(!user){return res.json({message:"user not found" ,success:false})}
        let checkpass = await bcrypt.compare(password,user.password)
        if(!checkpass){return res.json({message:'wrong password' ,success:false})}

        const token =  jwt.sign({userId:user._id} ,process.env.Jwt  , {expiresIn:"365d"})
        res.json({message:"login done" ,user , success:true , token})
    } catch (error) {
        res.json({message:error})
    }
}