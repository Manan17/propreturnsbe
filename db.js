const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose
      .connect("mongodb+srv://Manan17:Manan1234@cluster0.gwf0ho5.mongodb.net/")
      .then(() => {
        console.log("Connected to DB");
      })
      .catch((e) => console.log("DB error", e));
  } catch (e) {
    console.log(e);
  }
};

module.exports = connectDB;
