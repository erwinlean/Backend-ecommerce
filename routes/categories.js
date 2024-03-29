var express = require('express');
var router = express.Router();
const categoriesController = require("../controllers/categoriesController");

router.get('/', categoriesController.getAll);

router.post('/', categoriesController.create);

router.delete("/", categoriesController.elementDelete);

module.exports = router;