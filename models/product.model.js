const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, min: [0, "min  must be 0"], required: true },
  discountPercentage: {
    type: Number,
    min: [0, "min  must be 0"],
    max: [100, "max must be 100"],
  },
  rating: {
    type: Number,
    min: [0, "min rating must be 0"],
    max: [5, "max rating must be 5"],
  },
  stock: { type: Number },
  brand: { type: String },
  category: { type: String },
  thumbnail: { type: String },
  images: [{ type: String }],
});
exports.Product = mongoose.model("Product", productSchema);
