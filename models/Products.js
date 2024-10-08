import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
  name: String,
  brand: String,
  price: Number,
  category: { url: String, url2: String, _id: String },
  images: [{ img: String }],
  stats: [
    {
      value: String,
      name: { en: String, ge: String },
      id:String,
    },
  ],
});

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;
