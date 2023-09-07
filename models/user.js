const mongoose = require("mongoose");

// User Schema
const userSchema =  mongoose.Schema({
      name: {
            type: String,
            required: true,
      },
      email: {
            type: String,
            required: true,
            unique: true,
      },
      passwordHash: {
            type: String,
            required: true,
      },
      phone: {
            type: Number,
            required: true,
      },
      isAdmin: {
            type: Boolean,
            default: false,
      },
      country: {
            type: String,
            default: "",
      },
      city: {
            type: String,
            default: "",
      },
      street: {
            type: String,
            default: "",
      },
      zip: {
            type: Number,
            default: "",
      },
      apartment: {
            type: String,
            default: "",
      },
});
userSchema.virtual("id").get(function () {
      return this._id.toHexString();
});
userSchema.set("toJSON", {
      virtuals: true,
});

//Model
// Model generally start with capital letter
exports.User = mongoose.model("User", userSchema);
exports.userSchema = userSchema;
