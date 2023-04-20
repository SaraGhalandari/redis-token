const express = require('express');
const jwt = require ('jsonwebtoken');
const redis_client =require('../redis_connect');
//verify
function verifyToken(req,res,next){
    try{
        const token =req.headers.authorization.split(' ')[1];
        const decoded =jwt.verify(token,process.env.JWT_ACCESS_SECRET);
        req.userDate=decoded;
        next();
    }catch (error) {
        return res.status(401).json({status:false,message:"not valid",data:error});
    }
}
//refresh token
function verifyRefreshToken(req,res,next){
    const token=req.body.token;
    if (token===null)return res.status(401).json({status:false , message:"invalid"});
    try{
        const decoded =jwt.verify(token,process.env.JWT_ACCESS_SECRET);
        req.userDate=decoded;
        redis_client.get(decoded.sub.toString(),(err,data)=>{
            if(err) throw  err;
            if (data===null)return res.status(401).json({status:false,message:"not valid",data:error});
            if (JSON.parse(data).token != token)return res.status(401).json({status:false,message:"not valid",data:error});
        })
        redis_client.get(decoded.sub.toString , (err,data) =>{
            if (err) throw err ;
            if (data===null) return res.status(401).json({status:false,message:"not valid",data:error});
            if (JSON.parse(data).token != token) return res.status(401).json({status:false , message:"invalid"});
            next();
        })
    }catch (error) {
        return res.status(401).json({status:false,message:"not valid",data:error});
    }
}
 module.exports={
    verifyToken,
    verifyRefreshToken
 }