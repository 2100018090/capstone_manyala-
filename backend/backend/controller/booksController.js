const { Cities, ObjectId } = require("../models/cities");
const { Tour} = require("../models/tour");

const addTours = async (req, res) => {
  const tours = new Tour({
    nama_wisata: req.body.nama_wisata,
    kategori: req.body.kategori,
    kota: req.body.kota,
  });
  try {
    // const duplikat = await Book.findOne({ namaBuku: books.namaBuku });
    // if (duplikat) {
    //   throw new Error("nama buku sudah ada");
    // }
    const addTour = await tours.save();
    res.status(201).json({ addTour, message: "berhasil ditambahkan" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllTour = async (req, res) => {
  try{
  const users = await Tour.find(
    {},
    { _id: "$_id", nama_wisata: "$nama_wisata", kategori: "$kategori", kota: "$kota" }
  );
  res.status(200).json(users);
} catch (err) {
  res.status(404).json({
    message: err.message,
  });
  }
};


const getAllBooks = async (req, res) => {
  try{
  const users = await Cities.find(
    {},
    { _id: "$_id", nama_daerah: "$nama_daerah" }
  );
  res.status(200).json(users);
} catch (err) {
  res.status(404).json({
    message: err.message,
  });
  }
};

const searchBook = async (req, res) => {
  try {
    if (!req.query.namaBuku) {
      return res.status(400).json({ message: "Wrong Query", status: 400 });
    }
    const result = await Book.find({
      namaBuku: { $regex: req.query.namaBuku, $options: "i" },
    });
    // if (result.length === 0) {
    //   throw new Error("nama buku tidak ada");
    // }
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id });
    if (!book) {
      throw new Error("id not found");
    }
    res.status(200).json({
      book,
      message: "buku ditemukan",
    });
  } catch (err) {
    res.status(404).json({
      // message: err.message,
      message: "id not found",
    });
  }
};

const addBooks = async (req, res) => {
  const books = new Cities({
    nama_daerah: req.body.nama_daerah,
  });
  try {
    // const duplikat = await Book.findOne({ namaBuku: books.namaBuku });
    // if (duplikat) {
    //   throw new Error("nama buku sudah ada");
    // }
    const addBook = await books.save();
    res.status(201).json({ addBook, message: "berhasil ditambahkan" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateBook = async (req, res) => {
  try {
    // console.log(req.params);
    const book = await Book.findOne({ _id: req.params.id });
    if (!book) {
      throw new Error("id not found");
    }
    const duplikat = await Book.findOne({ namaBuku: req.body.namaBuku });
    if (book.namaBuku !== req.body.namaBuku && duplikat) {
      throw new Error("nama buku sudah ada");
    }
    const bookUpdated = await Book.updateOne(
      { _id: req.params.id },
      {
        $set: {
          namaBuku: req.body.namaBuku,
          penerbit: req.body.penerbit,
          pengarang: req.body.pengarang,
          tahunTerbit: req.body.tahunTerbit,
          tempatTerbit: req.body.tempatTerbit,
        },
      }
    );
    res
      .status(200)
      .json({ bookUpdated, message: "Data Buku Berhasil Di Ubah" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const delBook = await Book.deleteOne({ _id: req.params.id });
    res.status(200).json(delBook);
  } catch (err) {
    // res.status(404).json({message: err.message})
    res.status(404).json({ message: "id not found" });
  }
};

// const booksPagination = (req, res) => {
//   try {
//     const page = req.query.page || 1;
//     const perPage = req.query.perpage || 10;

//   } catch (error) {
//     res.status(400).json({ message: err.message });
//   }
// };

const reqError = (req, res) => {
  res
    .status(400)
    .json({ status: 400, message: "cannot request with this end point" });
};

module.exports = {
  getAllTour,
  addTours,
  getAllBooks,
  addBooks,
  getBookById,
  updateBook,
  deleteBook,
  reqError,
  searchBook,
};
