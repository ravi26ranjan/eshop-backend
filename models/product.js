const mongoose = require("mongoose");

// Product Schema
const productSchema = mongoose.Schema({
      name: {
            type: String,
            required: true,
      },
      description: {
            type: String,
            required: true,
      },
      richDescription: {
            type: String,
            default: "",
      },
      image: {
            type: String,
            default: "",
      },
      images: [
            {
                  type: String,
                  default: "",
            },
      ],
      brand: {
            type: String,
            default: "",
      },
      price: {
            type: Number,
            default: 0,
      },
      category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: "true",
      },
      countInStock: {
            type: Number,
            required: true,
            min: 0,
            max: 250,
      },
      rating: {
            type: Number,
            default: 0,
      },
      numberofReviews: {
            type: Number,
            default: 0,
      },
      isFeatured: {
            type: Boolean,
            default: false,
      },
      dateCreated: {
            type: Date,
            default: Date.now,
      },
});
productSchema.virtual("id").get(function () {
      return this._id.toHexString();
});
productSchema.set("toJSON", {
      virtuals: true,
});

//Model
// Model generally start with capital letter
exports.Product = mongoose.model("Product", productSchema);
