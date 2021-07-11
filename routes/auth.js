import express from "express";
import User from "../models/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user)
    return res.status(401).json({ message: "User not logged in." });

    res.status(200).json({ user: user });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
