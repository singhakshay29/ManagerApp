const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Add the Contact name"],
    },
    email: {
      type: String,
      required: [true, "Please Add the email Id"],
    },
    phone: {
      type: Number,
      required: [true, "Please Add the Phone number"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
