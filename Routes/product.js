import express from "express"
import { addProduct,getByUserId , getProduct, home ,getByid ,updateProduct , deleteProduct } from "../controllers/products.js"
import { isAuthanticate } from "../middleware/Auth.js"
const router = express.Router()



// add products 
router.post("/add" ,isAuthanticate, addProduct)

// get products
router.get("/get" , getProduct)

// get by product id
router.get("/get/:id" , getByid )
// get by user id

router.get("/getbyuserid" , isAuthanticate,getByUserId)

// update product

router.put("/update/:id" , updateProduct)

// delete
router.delete("/delete/:id" , deleteProduct)

// home
router.get("/home" , home)

export default router