const Products = require("../schema/productsSchema");
const {capitalizeWords} = require("../utils/capitalize");

module.exports = {
  allElements: async function (req, res, next) {
    try {
      const everyElement = await Products.find().populate("category");
      res.json(everyElement);
    } catch (err) {
      console.log(err);
    }
  },

  elementById: async function (req, res, next) {
    try {
      const elements = await Products.findById(req.params.id);
      res.json(elements);
    } catch (err) {
      console.log(err);
    }
  },

  elementByName: async function (req, res, next) {
    try {
      const elementsName = await Products.find({ name: req.params.name });
      res.json(elementsName);
    } catch (err) {
      console.log(err);
    }
  },

  createElement: async function (req, res, next) {
    try {
      const {name, sku, type, price, description, quantity, img, category, deleted, important} = req.body

      const nameCapitalize = capitalizeWords(name);
      const descripcionCapitalize = capitalizeWords(description);

      const newElement = {
        name: nameCapitalize,
        sku: sku,
        type: type,
        price: price,
        description: descripcionCapitalize,
        quantity: quantity,
        img: img,
        category: category,
        deleted: deleted,
        important: important
      };

      const new4catalogo = await newElement.save();

      res.json(new4catalogo);
    } catch (err) {
      console.log(err);
    }
  },

  elementUp: async function (req, res, next) {
    try {
      const up = await Products.updateOne({ _id: req.params.id }, req.body);
      res.json(up);
    } catch (err) {
      console.log(err);
    }
  },

  stockUpdate: async function (req, res, next) {
    try{
      const { quantity } = req.body;
      const productId = req.params;

      const product = await Products.findOne(productId);

      if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      };

      product.quantity -= quantity;

      product.save();

      res.json(product);

    } catch(error){
      console.log(error);
      res.status(500).json({ error: 'Error interno del servidor' });
    };
  },
  
  allElementUp: async function (req, res, next) {
    try {
      const upAll = await Products.updateMany({ name: req.params.name }, req.body);
      res.json(upAll);
    } catch (err) {
      console.log(err);
    }
  },

  elementDelete: async function (req, res, next) {
    try {
      const deleteOne = await Products.deleteOne({ _id: req.params.id });
      res.json(deleteOne);
    } catch (err) {
      console.log(err);
    }
  },

  allElementsDelete: async function (req, res, next) {
    try {
      const deleteMany = await Products.deleteMany({});
      res.json(deleteMany);
    } catch (err) {
      console.log(err);
    };
  }
};