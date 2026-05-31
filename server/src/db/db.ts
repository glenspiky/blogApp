import mongoose from "mongoose";

async function connectToDb() {
  try {
    const uri = await process.env.MONGODB_URI;

    if (uri) {
      mongoose.connect(uri);
      console.log("Connected to db");
    } else {
      console.log("Batabase uri is missing");
    }
  } catch (error) {
    console.log("Database connection faild: ", error);
  }
}
export default connectToDb;
