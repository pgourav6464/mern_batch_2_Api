import express from "express"
import mongoose from "mongoose"
import bodyParser from "express"
import productRouter from "./Routes/product.js"
import userRouter from "./Routes/user.js"
import cors from "cors"
import {config} from "dotenv"

const app = express()

config({path:".env"})

app.use(bodyParser.json())

// cors
app.use(cors({origin:true , methods:["POST","PUT","GET","DELETE"] ,credentials:true}))
// home route 
app.get("/" , (req,res)=>{
    const product = [
        {id:1,title:"i phone 15" ,price:50000},
        {id:2,title:"i phone 16" ,price:60000},
        {id:3,title:"i phone 17" ,price:70000}, 
        {id:4,title:"i phone 18" ,price:80000},
    ]
    res.json({message:"this is mern e commerce" , product})
})

// product router
app.use("/api/product", productRouter)

// user router
app.use("/api/user", userRouter)
 
const port = 3000
mongoose.connect(process.env.mongo_Uri,{dbName:"shoping_cart"}).then(()=>console.log("mangoDb connected 😎😎")).catch((error)=>console.log(error))
app.listen(port,()=>console.log("server running on port number",port))

  