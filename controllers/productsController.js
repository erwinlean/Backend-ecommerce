<<<<<<< HEAD
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
      const requestData = req.body;
  
      if (Array.isArray(requestData)) {
        const createdProducts = [];
  
        for (const element of requestData) {
          const { name, sku, price, description, quantity, img, category, deleted, important } = element;
          const nameCapitalize = capitalizeWords(name);
          const descripcionCapitalize = capitalizeWords(description);
  
          const newElement = new Products({
            name: nameCapitalize,
            sku: sku,
            price: price,
            description: descripcionCapitalize,
            quantity: quantity,
            img: img,
            category: category,
            deleted: deleted,
            important: important
          });
  
          const savedProduct = await newElement.save();
          createdProducts.push(savedProduct);
        };
  
        res.status(201).json(createdProducts);
      } else {
        const { name, sku, price, description, quantity, img, category, deleted, important } = requestData;
        const nameCapitalize = capitalizeWords(name);
        const descripcionCapitalize = capitalizeWords(description);
  
        const newElement = new Products({
          name: nameCapitalize,
          sku: sku,
          price: price,
          description: descripcionCapitalize,
          quantity: quantity,
          img: img,
          category: category,
          deleted: deleted,
          important: important
        });
  
        const savedProduct = await newElement.save();
        res.status(201).json(savedProduct);
      };
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
=======
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
        img: req.body.img,
        category: req.body.category,
        deleted: req.body.deleted,
        important: req.body.important
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
>>>>>>> f89ca1459a0986a835c57ae79333a48ae82ec41e
};