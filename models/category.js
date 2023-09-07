const mongoose = require("mongoose");

// Category Schema
const categorySchema = mongoose.Schema({
      name: {
            type: String,
            required: true,
      },
      icon: {
            type: String,
      },
      color: {
            type: String,
      },
});

//Model
// Model generally start with capital letter
exports.Category = mongoose.model("Category", categorySchema);
