const route = require('express').Router();
const auth_middle =require('../middlewares/auth.middle');

route.post('/register',user_controll.Register);
route.post('/login',user_controll.Login);
route.post('/token',auth_middle.verifyRefreshToken,user_controll.GetAccessToken);
route .get('/dashbord',auth_middle.verifyToken,(req,res)=>{
    return res.json({status:true,message:"you are in dashbord!!"});
});

module.exports=route;