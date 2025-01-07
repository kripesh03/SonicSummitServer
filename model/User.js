const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // user_id: {
    //   type: Number,
    //   required: true,
    //   unique: true,
    // },
    username: {
      type: String,
      required: true,
      unique: true,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      maxlength: 100,
    },
    // password: {
    //   type: String,
    //   required: true,
    //   maxlength: 255,
    // },
    role: {
      type: String,
      required: true,
      enum: ["artist", "admin", "costumer"],
    },
    profile_picture: {
      type: String,
      default: null,
      maxlength: 255,
    },
    bio: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true, 
  }
);
const User = mongoose.modelNames("Users", userSchema)

module.exports = User;
