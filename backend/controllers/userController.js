import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import { generateToken } from '../utilis/generateToken.js';


const authUser=asyncHandler(async (req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        res.json({
            _id:user._id,
            firstname:user.firstname,
            lastname:user.lastname,
            email:user.email,
            orgnizationname:user.orgnizationname,
            isAdmin:user.isAdmin,
            token:generateToken(user._id),
        });
    }else{
        res.status(401);
        throw new Error('Invalid Email or Password')
    }
})

const registerUser=asyncHandler(async (req,res)=>{
    const {firstname,lastname,email,password,orgnizationname}=req.body;

    const userExists=await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('user already exists');
    }
    const user=await User.create({firstname,lastname,email,password,orgnizationname});

    if(user){
        res.status(201).json({
            _id:user._id,
            firstname:user.firstname,
            lastname:user.lastname,
            email:user.email,
            orgnizationname:user.orgnizationname,
            token:generateToken(user._id),
        })
    }else{
        res.status(400);
        throw new Error('invalid user data')
    }
})

const getUsers=asyncHandler(async(req,res)=>{
    const users=await User.find({})
    res.json(users)
})

const deleteUser=asyncHandler(async(req,res)=>{
    const user =await User.findById(req.params.id)

    if (user){
        await user.remove();
        res.json({message:"User deleted"})
    }else{
        res.status(404)
        throw new Error('User Not Found')
    }
})

export {authUser,registerUser,getUsers,deleteUser}