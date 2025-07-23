const mongoose = require("mongoose");

const ItemPriceSchema = new mongoose.Schema({
  size: {
    type: String,
    enum: ["S", "M", "L"],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
}); 
const ProductSchema = new mongoose.Schema(
  { 
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    prices: {
      type: [ItemPriceSchema],
      required: true,
    },
    average_rating: {
      type: Number,
      default: 4.5,
    },
    ratings_count: {
      type: String,
      default: "0",
    },
    images: {
      type: [String],
      required: true,
    },
    brand: {
      type: String,
    },
  category: {
      type: String,
      enum: [
        "T-Shirts",
        "Shirts",
        "Hoodies",
        "Sweatshirts",
        "Jackets",
        "Pants",
        "Jeans",
        "Shorts",
        "Suits",
        "Traditional Wear",
        "Shoes",
        "Accessories",
      ],
      default: "T-Shirts",
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
