<<<<<<< HEAD
var express = require('express');
var router = express.Router();
const categoriesController = require("../controllers/categoriesController");

router.get('/', categoriesController.getAll);

router.post('/', categoriesController.create);

router.delete("/", categoriesController.elementDelete);

=======
var express = require('express');
var router = express.Router();
const categoriesController = require("../controllers/categoriesController");

router.get('/', categoriesController.getAll);

router.post('/', categoriesController.create);

router.delete("/", categoriesController.elementDelete);

>>>>>>> f89ca1459a0986a835c57ae79333a48ae82ec41e
module.exports = router;