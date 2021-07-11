import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import usersRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

app.use("/user", usersRouter);
app.use("/auth", authRouter);

app.get("/", (req, res) => res.send("API Running"));

const PORT = process.env.PORT || 5000;
console.log(process.env.PORT);
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT, () => console.log("hello")))
  .catch((error) => console.log(error.message));

mongoose.set("useFindAndModify", false);
