const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://cherynjacobs07_db_user:hello@cluster0.qovb56a.mongodb.net/?appName=Cluster0"
  );
  console.log("Database connected successfully");
};

module.exports = connectDB;
