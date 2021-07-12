import express from "express";
import { registerUser, login, addSymbol, addWatchList } from "../controllers/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", (req, res) => {});

router.post("/register", registerUser);

router.post("/login", login);

router.post("/add-symbol", auth, addSymbol);

router.post("/add-watchlist", auth, addWatchList);

export default router;
