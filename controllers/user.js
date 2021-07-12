import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getUser = async (req, res) => {};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists." });
    }
    user = new User({
      name,
      email,
      password,
      watchLists: [{ name: "My First Watchlist", symbols: ['goog'] }],
    });

    const salt = await bcrypt.genSalt(12);

    user.password = await bcrypt.hash(password, salt);

    await user.save();
    res.status(200).json({ message: "User registered" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist." });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials." });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser.id },
      "test",
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (err) {
    res.status(500).json("Something went wrong.");
  }
};

export const addSymbol = async (req, res) => {
  const email = req.userEmail;
  const { watchListName, symbol } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist." });

    console.log(existingUser);
    const updatedUser = await User.updateOne(
      { _id: existingUser.id },
      { $push: { "watchLists.$[elem].symbols": symbol } },
      { arrayFilters: [{ "elem.name": watchListName }] }
    );
    console.log(updatedUser);

    res.status(200).json({ result: updatedUser });
  } catch (err) {
    res.status(500).json("Something went wrong.");
  }
};

export const addWatchList = async (req, res) => {
  const { newWatchList } = req.body;
  const email = req.userEmail;
  console.log(email, newWatchList);
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist." });

    const updatedUser = await User.findByIdAndUpdate(
      existingUser.id,
      { $push: { watchLists: newWatchList } },
      {
        new: true,
      }
    );

    res.status(200).json({ result: updatedUser });
  } catch (err) {
    res.status(500).json("Something went wrong.");
  }
};
