import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  watchLists: Array,
});

const User = mongoose.model("userSchema", userSchema);

export default User;
