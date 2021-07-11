import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  stocks: Array,
});

const User = mongoose.model("userSchema", userSchema);

export default User;
