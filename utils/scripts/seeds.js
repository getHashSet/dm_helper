const mongoose = require("mongoose");

// This file empties the collections

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/projectthree"
);
