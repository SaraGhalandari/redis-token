const route = require('express').Router();
const user_controll =require('../controller/user.controll');
const auth_middle =require('../middlewares/auth.middle');

route.post('/register',user_controll.Register);
route.post('/login',user_controll.Login);
 route.post('/token',auth_middle.verifyRefreshToken,user_controll.GetAccessToken);
route .get('/dashbord',auth_middle.verifyToken,user_controll.Logout);

module.exports=route;