const mongoose = require ("../config/mongoDb"); 

const products = mongoose.Schema({ 
    name:{
        type:String,  
        lowercase:true,
        min:1
    },
    sku:{
        type:String,
        ref:"types",
        unique:true
    },
    type:String, 
    price:{
        type:Number, 
        require:true,
        min:1,
    },
    description:{
        type:String,
        lowercase:true,
        require:true,
        min:10
    },
    quantity:{
        type:Number,
        require:true,
        min:1
    },
    //category:{
    //    type:mongoose.Schema.ObjectId,
    //    lowercase:true,
    //    ref:"Categories"
    //},
    deleted:{
        type:Boolean,
        default:false
    }
});

module.exports = mongoose.model("products",products); 