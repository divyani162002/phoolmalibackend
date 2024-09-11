const mongoose = require("mongoose")

const membershipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // phonenumber: {
  //   type: Number,
  //   required: true,
  // },
  phonenumber: {
    type: String, // Change from Number to String
    required: true,
    validate: {
      validator: function (v) {
        // Regex to match a phone number (10 digits)
        return /^\d{10}$/.test(v);
      },
      message: props => `${props.value} is not a valid 10-digit phone number!`
    }
  },
  adhaarcard: {
    type: Number,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
    dob: {
        type: Date,
        required:true
  },
    membershiptype: {
        type: String,
        reuired:true
  },
});

module.exports = mongoose.model("Membership",membershipSchema)