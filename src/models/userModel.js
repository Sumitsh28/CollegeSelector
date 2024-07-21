import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },

  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  favorites: [
    {
      name: String,
      photoUrl: String, // Store the URL or path of the college photo
    },
  ],
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
