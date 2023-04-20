require('dotenv').config();
const express = require('express');
const app = express ();
const mongoose =require('mongoose');
app.use(express.json());

mongoose.connect(
    {useUnifiedTopology : true , useNewUrlParser:true},
    process.env.DB_CONN_STRING,()=> console.log('connect mongo')
    
);
//auth route
const auth_routes=require('./routes/auth.routes');
const user_routes=require('./routes/user.routes');
app.use('/v1/auth',auth_routes);
app.use('/v1/user',user_routes);

app.listen(5500);