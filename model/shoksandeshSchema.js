const mongoose = require("mongoose");

const shoksandeshSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  dod: {
    type: Date,
    required: true,
    },
    dateofceremony: {
        type: Date,
       required:true,
    },
    timing: {
        type: String,
        required:true
        
    },
    address: {
        type: String,
        required:true
    }
    ,
    familyname: {
        type: String,
        required:true
    }
});

module.exports = mongoose.model("Shoksandesh", shoksandeshSchema);
