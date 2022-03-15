var express = require('express');
var router = express.Router();
const categoriesController = require("../controllers/categoriesController")

router.get('/', categoriesController.getAll);
router.post('/',(req,res,next)=>{req.app.jsonWebT()}, categoriesController.create);
router.delete("/:id",(req,res,next)=>{req.app.jsonWebT()},categoriesController.elementDelete);
module.exports = router;