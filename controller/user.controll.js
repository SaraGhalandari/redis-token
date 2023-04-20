const User=require('../model/user.modle');
const express =require('express');
const jwt =require('jsonwebtoken');
// const redis_client=require('../modules/redis_connect');
//register
async function Register (req,res){
    const User = new user ({
        username :req.body.username,
        password : req.body.password,
        phone : req.body.phone,
        Email :req.body.Email
    });
    try{
        const saved_user = await User.save();
        res.json({status :true , message :"register success!",data :saved_user});

    }catch(error){
       res.status(401).json({status : false , message :"register not success!",
        data:error});
    }
}
//login
async function Login (req,res){
    const username =req.body.username;
    const phone =req.body.phone;
    const Email = req.body.Email;
    const password =req.body.password;
    try{
         const user = await User.findOne({username:username , password:password,
        phone :phone ,Email:Email}).exec();
     if (user===null)res.status(401).json({status : false , message :"register not success!"});
     const access_token =jwt.sign({sub:user._id},process.env.JWT_ACCESS_SECRET,
        {expiresIn:process.env.JWT_ACCESS_TIME});
     const refresh_token =GenerateRefreshToken(user._id);
     return res.json({status:true , message:"login success!",data:{access_token,refresh_token}});
    }catch(error){
        return res.status(401).json({status:true , message:"login fall!",data:error});
    }
}
    // return res.status(401).json({status:true , message:"login fall!"});

//logout
async function Logout (req,res){
    const user_id =req.userDate.sub;
    //remove
    try{
        await redis_client.del(user_id.toString());
    //black
    await redis_client.set('BL_'+user_id.toString(),token);
    return res.json({status:true,message:"blocked!"});
    }catch({error}){
        console.error('an error occure in connect to logout');
        console.error(error)
    }

}
//access token
function GetAccessToken (req,res){
    const user_id=req.userDate.sub;
    const access_token =jwt.sign({sub:user_id},process.env.JWT_ACCESS_SECRET,
        {expiresIn:process.env.JWT_ACCESS_TIME});
    const refresh_token =GenerateRefreshToken(user_id);
    return res.json({status:true , message:"login success!",data:{access_token,refresh_token}});

}
//Generate refresh token
function GenerateRefreshToken(user_id){
    const refresh_token=jwt.sign({sub:user_id}, process.env.JWT_ACCESS_SECRET,{expiresIn:process.env.JWT_ACCESS_TIME});
    redis_client.get(user_id.toString(),(err,data)=>{
        if (err) throw err;

        redis_client.set(user_id.toString().JSON.stringfy({token : refresh_token}));
    })
      return refresh_token;
}

module.exports={
    Register,
    Login,
    Logout,
    GetAccessToken
}