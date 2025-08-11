import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            quantity: { type: Number, default: 1 }
        }
    ],
    status: {
        type: String,
        enum: ["pending", "shipped", "delivered", "cancelled"],
        default: "pending"
    }
},  { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order