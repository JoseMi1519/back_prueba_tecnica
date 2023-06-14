const mongoose = require("mongoose");
const { Schema } = mongoose;

//poner lo que necesitamos: tlf, nombre...
const User = new Schema({
  name: String,
  email: String,
  phone: String,
  password: String,
});

module.exports = mongoose.model("User", User);
