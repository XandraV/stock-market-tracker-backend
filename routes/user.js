import express from "express";
import { registerUser, login, addSymbol } from "../controllers/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", (req, res) => {});

router.post("/register", registerUser);

router.post("/login", login);

router.post("/add-stocks", auth, addSymbol);

export default router;
