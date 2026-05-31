import "dotenv/config";
import express, { Application } from "express";
import connectToDb from "./db/db.js";
import { User } from "./models/User.js";
import authRouter from "./routes/authRoutes.js";
import PostRouter from "./routes/routes.js";

const app: Application = express();
app.use(express.json());
app.use("/api/auth/", authRouter);
app.use("/api/posts/", PostRouter);

connectToDb();

async function testDb() {
  try {
    const testUser = await User.create({
      userName: "Test Admin",
      email: "test@blogapp.com",
      password: "supersecretpassword123",
    });
    console.log(testUser);
  } catch (error) {
    console.log("Error during database test: ", error);
  }
}

const PORT = 5000;

app.listen(PORT, () => {
  console.log("Lisening on port: ", PORT);
});

// testDb();
