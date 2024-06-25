const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      return;
    }
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("Database Connected Successfully");
  } catch (error) {
    console.error("Error connecting to database", error);
  }
};

export default dbConnect;
