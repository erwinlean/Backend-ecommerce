<<<<<<< HEAD
var express = require('express');
var router = express.Router();
const controller = require("../controllers/productsController");

router.get("/", controller.allElements);
router.get("/:id", controller.elementById);
router.get("/name/:name", controller.elementByName);

router.post("/create", controller.createElement);

router.put("/:id", controller.elementUp);
router.put("/name/:name", controller.allElementUp);
router.put("/stock/:id", controller.stockUpdate); // stock update

router.delete("/:id", controller.elementDelete);
router.delete("/delete", controller.allElementsDelete);

=======
var express = require('express');
var router = express.Router();
const controller = require("../controllers/productsController");

router.get("/", controller.allElements);
router.get("/:id", controller.elementById);
router.get("/name/:name", controller.elementByName);
router.post("/create", controller.createElement);
router.put("/:id", controller.elementUp);
router.put("/name/:name", controller.allElementUp);
//router.delete("/:id", controller.elementDelete);
router.delete("/delete", controller.allElementsDelete);

>>>>>>> f89ca1459a0986a835c57ae79333a48ae82ec41e
module.exports = router;