 const redis = require('redis');
console.log('pass')
const redis_client=redis.createClient(proccess.env.JWT_REDIS_PORT,process.env.JWT_REDIS_HOST)

try{
    redis_client.on('connect',()=>{
        console.log('redis connect');
    });
}catch({error}){
    console.error('an error occure in connect to redis');
    console.error(error)
}
 module.exports=redis_client;