var express = require('express');
var router = express.Router(); 
const userController = require("../controllers/userController");
router.get("/",(req,res,next)=>{req.app.jsonWebT()},userController.allUsers);
router.get("/:id",userController.usersId);
router.post("/",(req,res,next)=>{req.app.jsonWebT()},userController.createUser);
router.post("/login",userController.userLogin);
module.exports = router; 