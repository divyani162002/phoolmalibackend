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
  phonenumber: {
    type: Number,
    required: true,
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