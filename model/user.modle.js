const mongoose = require ('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type : String,
        require :true,
        min :6,
        max :255
    },
    password:{
        type :String,
        require : true
    },
    phone:{
        type:String,
        require:true,
        max:10
    },
    Email:{
        type:String,
        require:true
    }

});
module.exports=mongoose.model('User',userSchema);