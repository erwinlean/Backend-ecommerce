const Products = require("../schema/productsSchema");
const { capitalizeWords } = require("../utils/capitalize");

module.exports = {
  allElements: async function (req, res, next) {
    try {
      const everyElement = await Products.find().populate("category");
      res.status(200).json(everyElement);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error interno del servidor' });
    };
  },

  elementById: async function (req, res, next) {
    try {
      const element = await Products.findById(req.params.id);
      if (!element) {
        return res.status(404).json({ error: 'Elemento no encontrado' });
      }
      res.status(200).json(element);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error interno del servidor' });
    };
  },

  elementByName: async function (req, res, next) {
    try {
      const elementsName = await Products.find({ name: req.params.name });
      res.status(200).json(elementsName);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error interno del servidor' });
    };
  },

  createElement: async function (req, res, next) {
    try {
      const { name, sku, type, price, description, quantity, img, category, deleted, important } = req.body;

      const nameCapitalize = capitalizeWords(name);
      const descripcionCapitalize = capitalizeWords(description);

      const newElement = new Products({
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
      });

      const new4catalogo = await newElement.save();

      res.status(201).json(new4catalogo);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error interno del servidor' });
    };
  },

  elementUp: async function (req, res, next) {
    try {
      const up = await Products.updateOne({ _id: req.params.id }, req.body);
      res.status(200).json(up);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error interno del servidor' });
    };
  },

  stockUpdate: async function (req, res, next) {
    try {
      const { quantity } = req.body;
      const productId = req.params;

      const product = await Products.findOne(productId);

      if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      };

      product.quantity -= quantity;

      product.save();

      res.status(200).json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor' });
    };
  },
  
  allElementUp: async function (req, res, next) {
    try {
      const upAll = await Products.updateMany({ name: req.params.name }, req.body);
      res.status(200).json(upAll);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error interno del servidor' });
    };
  },

  elementDelete: async function (req, res, next) {
    try {
      const deleteOne = await Products.deleteOne({ _id: req.params.id });
      res.status(200).json(deleteOne);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error interno del servidor' });
    };
  },

  allElementsDelete: async function (req, res, next) {
    try {
      const deleteMany = await Products.deleteMany({});
      res.status(200).json(deleteMany);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error interno del servidor' });
    };
  }
};