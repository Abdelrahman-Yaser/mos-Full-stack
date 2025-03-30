import User from "../models/user";
import bycrypt from "bcrypt"
import jwt from "cookie-parser"
const register=async (req,res)=>{
    const {username,email,password}=res.body;
    if(!username ||!email ||!password){
        return res.status(400).json({massege:"ooop"})
    }

    const foundUser=await User.findOne({email })
    if(foundUser){
        res.status(401).json({message:"email already  exsits "})
    }

    const hashedPassword=await bycrypt.hash(password,13)
    const user =new User.create({
        username,
        email,
        password:hashedPassword
    })

    const accessToken= jwt.sign({
        userInfo:{
            id:user._id
        }},
        {
         process.env.ACCESS_TOKEN_SECRET,
        },
        {    
         expiresIn:"15m"
        })

        const refreshToken= jwt.sign({
            userInfo:{
                id:user._id
            }},
            {
             process.env.REFRESH_TOKEN_SECRET,
            },
            {    
             expiresIn:"15m"
            })
            res.cookie("jwt",refreshToken,{
                httpOnly:true,
                secure:true,
                sameSite:None,
                maxage:1000* 60 * 60 * 24 * 7
            })
            res.json({accessToken,email:user})
} 
const login= async (req,res)=>{
    const {email,password}=res.body;
    if(!email ||!password){
        return res.status(400).json({message:"problem"})
    }

    const checkUser=await User.findOne({email })
    if(!foundUser){
        res.status(401).json({message:"register  create acoount "})
    }

    const comparePass= await crypto.compare(checkUser.password, password)
    if(!comparePass){
        res.status(401).json({message:"email and  password is wrong "})
    }

    if(checkUser && comparePass){
        res.json
    }

    const accessToken= jwt.sign({
        userInfo:{
            id:checkUser._id
        }},
        {
         process.env.ACCESS_TOKEN_SECRET,
        },
        {    
         expiresIn:"15m"
        })

    const refreshToken= jwt.sign({
            userInfo:{
                id:checkUser._id
            }},
            {
             process.env.REFRESH_TOKEN_SECRET,
            },
            {    
             expiresIn:"15m"
         })
}
res.json({accessToken,email:checkUser.email})


module.exports={
    register
}