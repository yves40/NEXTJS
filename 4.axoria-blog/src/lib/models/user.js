import mongoose from "mongoose";

const modulename = "***** MODELS # ";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  normalizedUserName: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
//   isAdmin: {
//     type: Boolean,
//     default: false
//   }
})
export const User = mongoose.models?.User || mongoose.model("User", userSchema);
