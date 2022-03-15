const jwt = require("jsonwebtoken"); 
var express = require('express');
const keyjsonWT = "key123";
const jsonWebT = (req,res,next) =>{
    jwt.verify(req.body["token-Ok"],keyjsonWT),
    function(err,ok){
      if(err){
        res.json(`error, token necesario ${err}`)
      }else{
        console.log(`funcionando token ${ok}`);
        next();
      }
    } 
} 
module.exports=jsonWebT;