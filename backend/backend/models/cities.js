const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// membuat schema

const Cities = mongoose.model("cities", {
  nama_daerah: {
    type: String,
    required: true,
  },
});

module.exports = { Cities, ObjectId };
