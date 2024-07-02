import { Products } from "../Models/Products.js"


// add products
export const addProduct = async(req,res)=>{
    const {title ,  description,price,qty,imgsrc,category} = req.body
    try {
        const product =  await Products.create({title ,  description,price,qty,imgsrc,category ,userId:req.user})
        res.json({message:"Your products has been Added",success:true ,product})
        
    } catch (error) {
        res.json({message:error.message})  
    } 
}

// get products
export const getProduct = async(req,res)=>{
    try {
        const data = await Products.find().sort({createdAt:-1})
        res.json({message:"all products",data})
        
    } catch (error) {
        res.json({message:error.message})  
    }
}

// home

export const home =async (req,res)=>{
    res.json({message:'home'})
}

// get by id

export const getByid = async  (req,res)=>{
    const id = req.params.id
    try {
        let product =  await Products.findById(id)
        if(!product){return res.json({message:"invalid id"})}
        res.json({message:"Product find successfully" , product})
        
    } catch (error) {
        res.json({message:error.message}) 
        
    }
}

// get by user id
export const getByUserId = async  (req,res)=>{
    const id = req.user
    try { 
        let product =  await Products.find({userId:id})
        // let products =  await Products.findById()
        
        if(!product){return res.json({message:"invalid id"})}
        res.json({message:"Product find successfully" , product})
        
    } catch (error) {
        res.json({message:error.message}) 
        
    }
}

export const  updateProduct = async (req,res)=>{
    const id = req.params.id;
    try {
        
        let product = await Products.findByIdAndUpdate(id, req.body, { new: true });
        if (!product) return res.json({ message: "Invalid Id" });
        res.json({ message: "Your Product has been updated...!", product });
        
    } catch (error) {
        res.json({message:error.message}) 
        
    }
}

export const  deleteProduct = async (req,res)=>{

    const id = req.params.id;
    try {
        let product = await Products.findByIdAndDelete(id);
        if (!product) return res.json({ message: "Invalid Id" });
        res.json({ message: "Your Product has been Deleted...!" });
    } catch (error) {
        
    }
   
  
}