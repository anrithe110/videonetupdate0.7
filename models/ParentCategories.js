import mongoose, { Schema } from "mongoose";

const parentCategoriesSchema = new Schema({
  name: { en: String, ge: String },
  url: String,
  categories: [
    {
      url: String,
      _id: mongoose.Schema.Types.ObjectId,
      name: { en: String, ge: String },
    },
  ],
  brands: [{ name: String, _id: String }],
});
const ParentCategories =
  mongoose.models.ParentCategories ||
  mongoose.model("ParentCategories", parentCategoriesSchema);
export default ParentCategories;
