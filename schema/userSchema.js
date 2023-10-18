//const mongoose = require ("../config/mongoDb");
//const encrypt = require ("bcrypt");
//const errMessage = require ("../errors/error-handler");
//const users = mongoose.Schema({
//    name:{
//        type:String,
//        min:4,
//        required:[true,errMessage.general.campo_obligatorio.minLegth]
//    }, 
//    email:{
//        type:String,
//        required:[true,errMessage.general.campo_obligatorio],
//        unique:true
//    },
//    password:{
//        type:String,
//        required:[true,errMessage.general.campo_obligatorio],
//        min:7, 
//    } 
//});
//users.pre("save",function(next){
//    if(this.password.includes(!Number&&String)){ 
//        console.log("El password debe tener numeros y letras.");
//    }else{
//        this.password=encrypt.hashSync(this.password,12);
//        console.log("password funcionando y encriptado");
//        next();
//    } //si el password tiene number+string sera true encriptara el password
//    let emailCheck = users.email;
//    if (this.email){
//        emailCheck.includes("@"&&"."&&String); 
//    }else{
//        console.log("El mail no contiene @ y/o . necesarios.")
//    }//funcion para verificar que el mail contenga @ y punto por lo cual sea mail realmente 
//    next()
//})
//module.exports = mongoose.model("users",users);