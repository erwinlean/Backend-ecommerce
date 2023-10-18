const products = require("../schema/productsSchema");

module.exports = {
  allElements: async function (req, res, next) {
    try {
      const everyElement = await products.find().populate("category");
      res.json(everyElement);
    } catch (err) {
      console.log(err);
    }
  },
  elementById: async function (req, res, next) {
    try {
      const elements = await products.findById(req.params.id);
      res.json(elements);
    } catch (err) {
      console.log(err);
    }
  },
  elementByName: async function (req, res, next) {
    try {
      const elementsName = await products.find({ name: req.params.name });
      res.json(elementsName);
    } catch (err) {
      console.log(err);
    }
  },
  createElement: async function (req, res, next) {
    try {
      const newElement = new products({
        name: req.body.name,
        sku: req.body.sku,
        type: req.body.type,
        price: req.body.price,
        description: req.body.description,
        quantity: req.body.quantity,
        category: req.body.category,
        deleted: req.body.deleted,
      });
      const new4catalogo = await newElement.save();
      res.json(new4catalogo);
    } catch (err) {
      console.log(err);
    }
  },
  elementUp: async function (req, res, next) {
    try {
      const up = await products.updateOne({ _id: req.params.id }, req.body);
      res.json(up);
    } catch (err) {
      console.log(err);
    }
  },
  allElementUp: async function (req, res, next) {
    try {
      const upAll = await products.updateMany({ name: req.params.name }, req.body);
      res.json(upAll);
    } catch (err) {
      console.log(err);
    }
  },
  elementDelete: async function (req, res, next) {
    try {
      const deleteOne = await products.deleteOne({ _id: req.params.id });
      res.json(deleteOne);
    } catch (err) {
      console.log(err);
    }
  },
  allElementsDelete: async function (req, res, next) {
    try {
      const deleteMany = await products.deleteMany({});
      res.json(deleteMany);
    } catch (err) {
      console.log(err);
    };
  }
};