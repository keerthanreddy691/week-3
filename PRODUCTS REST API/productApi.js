import exp from 'express'
export const productApp=exp.Router()
import { productModel } from '../models/productModel.js'

// create product
productApp.post("/products",async(req,res)=>{
    //get assigned 
    const productObj=req.body
    //get in db
    const newProductDocument=new productModel(productObj)
    const result=await newProductDocument.save()
    console.log(result)
    res.status(201).json({message:"product created"})
})
productApp.get("/products",async(req,res)=>{
    //read all users from db
    let productList=await productModel.find()
    //send res
    res.status(200).json({message:"products",payload:productList})
})
productApp.get("/products/:id",async(req,res)=>{
    //read object id from req params
    const pid=req.params.id
    //find user by id
    const productObj=await productModel.findById({_id:pid})
    if(!productObj){
       return  res.status(404).json({message:"user not found"})
    }
    //res
    res.status(200).json({message:"success",payload:productObj})
})
productApp.put("/products/:id",async(req,res)=>{
    //get modified product from req
    const modifiedproduct=req.body

    //find product by id
    const pid=req.params.id
    //let us find and update by id
    const updatedproduct=await productModel.findByIdAndUpdate(pid,{$set:{ ...modifiedproduct}},{new:true,runValidators:true})
    //send res
    res.status(200).json({message:"update done",payload:updatedproduct})


})
productApp.delete("/products/:id",async(req,res)=>{
    //get product id
    const pid=req.params.id
    //find id and delete
    const productDelete=await productModel.findByIdAndDelete(pid)
    if(!productDelete){
        return res.status(404).json({message:"no documentto delete"})
    }
    //res
    res.status(200).json({message:"deleted",payload:productDelete})
})