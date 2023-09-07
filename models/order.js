const mongoose = require("mongoose");

// Order Schema
const orderSchema =  mongoose.Schema({
      orderItems: [
            {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "OrderItem",
                  required: true,
            }
      ],
      shippingAddress1: {
            type: String,
            required: true,
      },
      shippingAddress2: {
            type: String,
      },
      city: {
            type: String,
            required: true,
      },
      zip: {
            type: Number,
            required: true,
      },
      country: {
            type: String,
            required: true,
      },
      phone: {
            type: Number,
            required: true,
      },
      user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
      },
      status: {
            type: String,
            required: true,
            default: "pending",
      },
      totalPrice: {
            type: Number,
            // required: true,
      },
      
      dateOfOrder: {
            type: Date,
            default: Date.now,
      },
});
orderSchema.virtual("id").get(function () {
      return this._id.toHexString();
});
orderSchema.set("toJSON", {
      virtuals: true,
});

//Model
// Model generally start with capital letter
exports.Order = mongoose.model("Order", orderSchema);


/*
 {
      "OrderItem":[
            {
                  "quantity":2,
                  "product":"9i904i309u49u-032"
            }
            {
                   "quantity":5,
                  "product":"87uysdfdj7543934h"
            }
      ],
      "shippingAddrss1":"XYX",
      "shippingAddrss2":"XYX",
      "country":"India"
 }

*/