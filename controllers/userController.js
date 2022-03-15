const { post } = require("../routes");
const users = require ("../schema/userSchema"); 
const bcrypt = require ("bcrypt"); 
const jwt = require("jsonwebtoken");
//const jwtkey = require ("../config/jwt"); parece que no necesita un require por que ya esta en app gneral

module.exports={
    allUsers: async function(req,res,next){
        try{
            const allUser = await users.find()
            res.json(allUser);
        }catch(err){
            console.log(err);
        }
    },
    usersId: async function(req,res,next){
        try{
            const userByid = await users.findById({_id:req.params.id},req.body)
            res.json(userByid);
        }catch(err){
            console.log(err);
        }
    },
    userLogin: async function(req,res,next){
        try{
            const usersComp = await users.findOne({email:req.body.email})
            if(!usersComp){
                console.log("error, no se encontro coincidencia de mail")
            }
            if(bcrypt.compareSync(req.body.password,usersComp.password)){
                const jwtToken= jwt.sign({
                    userName:usersComp.name
                },  keyjsonWT,{
                    expiresIn:"1h"
                })
                console.log(`funcionando token${jwtToken}`);
                console.log(`funcionando contraseña y mail ${usersComp}`);
            }else{
                console.log("error, contraseña incorrecta")
            }
        }catch(err){
            console.log(err);
            next()
        }
    },
    createUser: async function(req,res,next){
        try{
            const userSch = new users({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password
            })
            const newUser = await userSch.save()
            res.json(newUser)
        }catch(err){
            console.log(err);
        }
    },    
}