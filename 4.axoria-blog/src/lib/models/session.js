"use server"

import mongoose from "mongoose";

const modulename = "***** MODELS # ";

const sessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expireAfterSeconds: 0 } // Used to shoot the session after expiration 
  }
})
export const Session = mongoose.models?.Session || mongoose.model("Session", sessionSchema);
