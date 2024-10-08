import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: String,
  name: String,
  lastName: String,
  password: String,
  tel: String
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
