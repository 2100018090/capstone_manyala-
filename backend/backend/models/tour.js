const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Tour = mongoose.model("Tour", {
    nama_wisata: {
      type: String,
      required: true,
    },
    kategori: {
        type: String,
        require: true,
    },
    kota: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Cities',
    },
  
  });

  module.exports = { Tour, ObjectId };