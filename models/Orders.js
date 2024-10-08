import mongoose, { Schema } from "mongoose";

const OrdersSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  orders: [
    {
      id: String,
      _id: mongoose.Schema.Types.ObjectId,
      productId: String,
      Quantity: Number,
      price: Number,
    },
  ],
  user_id: String,
});

const Orders = mongoose.models.Orders || mongoose.model("Orders", OrdersSchema);

export default Orders;
