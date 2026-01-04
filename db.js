// db.js
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas Connected Successfully"))
  .catch((err) => console.error("MongoDB Connection Failed:", err.message));

module.exports = mongoose;
