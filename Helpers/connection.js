import mongoose from "mongoose";

const Connection = async () => {
  // Default to localhost if MONGODB_URL is not set
  const mongoURL = process.env.MONGODB_URL || "mongodb://localhost:27017/auth";

  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURL);

    // Event listeners
    mongoose.connection.on("connected", () => {
      console.log("Mongoose connected to db");
    });

    mongoose.connection.on("error", (err) => {
      console.error("Mongoose connection error:", err.message);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Mongoose connection is disconnected");
    });

    process.on("SIGINT", async () => {
      console.log("test");
      await mongoose.connection.close();
      process.exit(0);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }

  return mongoose;
};

export default Connection;
