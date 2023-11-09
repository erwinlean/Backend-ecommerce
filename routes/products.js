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

module.exports = router;