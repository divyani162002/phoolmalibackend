const mongoose = require("mongoose")

const matrimonySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phonenumber: {
    type: String, // Change from Number to String
    required: true,
    validate: {
      validator: function (v) {
        // Regex to match a phone number (10 digits)
        return /^\d{10}$/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid 10-digit phone number!`,
    },
  },
  bio: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Matrimony",matrimonySchema)