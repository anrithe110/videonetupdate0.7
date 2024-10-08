import mongoose, { Schema } from "mongoose";

const BrandSchema = new Schema({
    name: String,
    image: [String]
});

const Brand = mongoose.models.Brand || mongoose.model("Brand", BrandSchema);

export default Brand;
