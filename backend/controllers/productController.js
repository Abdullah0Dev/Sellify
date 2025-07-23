const mongoose = require('mongoose');
const Products = require('../models/productsModel');

// Get all products
const getProducts = async (req, res) => {
  const products = await Products.find({}).sort({ createdAt: -1 });
  res.status(200).json(products);
};

// Get single product by ID
const getProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Not a valid ID' });
  }

  const product = await Products.findById(id);
  if (!product) {
    return res.status(404).json({ error: 'No such product' });
  }

  res.status(200).json(product);
};

// Add a new product
const addProduct = async (req, res) => {
  const {
    name,
    description,
    images,
    prices,
    brand,
    category,
    average_rating,
    ratings_count,
    quantity,
  } = req.body;

  try {
    const product = await Products.create({
      name,
      description,
      images,
      prices,
      brand,
      category,
      average_rating,
      ratings_count,
      quantity,
    });

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such ID' });
  }

  const product = await Products.findByIdAndDelete(id);
  if (!product) {
    return res.status(400).json({ error: 'No such product.' });
  }

  res.status(200).json(product);
};

// Update a product
const updateProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Not a valid ID' });
  }

  const product = await Products.findByIdAndUpdate(id, { ...req.body }, { new: true });

  if (!product) {
    return res.status(404).json({ error: 'No such product' });
  }

  res.status(200).json(product);
};

// Export
module.exports = {
  getProducts,
  getProduct,
  addProduct,
  deleteProduct,
  updateProduct,
};
