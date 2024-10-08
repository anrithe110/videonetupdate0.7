import mongoose from "mongoose";
const name = process.env.DATABASE_URL 
const connectMongoDB = async () => {
  try {
    await mongoose.connect(name);
    console.log('conected');
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;
