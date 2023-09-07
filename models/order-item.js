const mongoose = require("mongoose");

// Order Item Schema
const orderItemSchema =  mongoose.Schema({
      quantity: {
            type: Number,
            required: true,
      },

      product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
      },
});

// Model generally start with capital letter
exports.OrderItem = mongoose.model("OrderItem", orderItemSchema);
