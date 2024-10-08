import mongoose, { Schema } from "mongoose";

const CategorySchema = new Schema({
  name: { en: String, ge: String },
  stats: [
    { name: { en: String, ge: String }, id: String ,  statOptions: [{ option: String }] },
  ],
  url: String,
});

const Category =
  mongoose.models.Category || mongoose.model("Category", CategorySchema);

export default Category;
