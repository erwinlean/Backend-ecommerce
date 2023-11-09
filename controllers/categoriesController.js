<<<<<<< HEAD
const categories = require("../schema/categoriesSchema");

module.exports = {
  getAll: async function (req, res, next) {
    try {
      const allCategories = await categories.find();
      res.json(allCategories);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    };
  },

  create: async function (req, res, next) {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ error: 'Name is required' });
      };

      const newCategory = new categories({
        name: name,
      });

      const response = await newCategory.save();
      res.status(201).json(response);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: "Bad request" });
    };
  },
  
  elementDelete: async function (req, res, next) {
    try {
      const deleteOne = await categories.deleteMany({});
      res.json(deleteOne);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    };
  },
=======
const categories = require("../schema/categoriesSchema");

module.exports = {
  getAll: async function (req, res, next) {
    try {
      const allCategories = await categories.find();
      res.json(allCategories);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  create: async function (req, res, next) {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ error: 'Name is required' });
      }

      const newCategory = new categories({
        name: name,
      });

      const response = await newCategory.save();
      res.status(201).json(response);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: "Bad request" });
    }
  },
  
  elementDelete: async function (req, res, next) {
    try {
      const deleteOne = await categories.deleteMany({});
      res.json(deleteOne);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  },
>>>>>>> f89ca1459a0986a835c57ae79333a48ae82ec41e
};