const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, cate) => {
    if (err || !cate) {
      return res.status(400).json({
        error: "category not found in the database",
      });
    }
    req.category = cate;
    next();
  });
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, cate) => {
    if (err || !cate) {
      return res.status(400).json({
        error: "Not able to save category",
      });
    }
    res.json({ cate });
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};
exports.getAllCategories = (req, res) => {
  //
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "No category found",
      });
    }
    res.json(categories);
  });
};

exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  category.save((err, updatedCategory) => {
    if (err) {
      return res.status(400).json({
        error: "No category found",
      });
    }

    res.json(updatedCategory);
  });
};

exports.removeCategory = (req, res) => {
  const category = req.category;
  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "failed to delete `${category.name}` category",
      });
    }
    res.json({
      message: "Successfully deleted category `${category.name}`!!",
    });
  });
};
