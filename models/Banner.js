import mongoose, { Schema } from "mongoose";

const BannerSchema = new Schema({
    name: String,
    image: [String]
});

const Banner = mongoose.models.Banner || mongoose.model("Banner",  BannerSchema);

export default Banner;
