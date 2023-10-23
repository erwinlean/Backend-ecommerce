const mongoose = require ("mongoose");
const encrypt = require ("bcrypt");
const errMessage = require ("../errors/error-handler");
const users = mongoose.Schema({
    name:{
        type:String,
        min:4,
        required:[true,errMessage.general.campo_obligatorio.minLegth]
    }, 
    email:{
        type:String,
        required:[true,errMessage.general.campo_obligatorio],
        unique:true 
    },
    password:{
        type:String,
        required:[true,errMessage.general.campo_obligatorio],
        min:7, 
    },
    userImg:{
        type: String,
        default: "https://img.freepik.com/premium-vector/gray-avatar-icon-vector-illustration_276184-163.jpg"
    }
});

users.pre("save",function(next){
    if(this.password.includes(!Number&&String)){ 
        console.log("El password debe tener numeros y letras.");
    }else{
        this.password=encrypt.hashSync(this.password,12);
        console.log("password funcionando y encriptado");
        next();
    } 
    let emailCheck = users.email;
    if (this.email){
        emailCheck.includes("@"&&"."&&String); 
    }else{
        console.log("El mail no contiene @ y/o . necesarios.")
    }
    next()
})
module.exports = mongoose.model("users",users);