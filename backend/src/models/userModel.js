const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["candidate", "admin"],
    default: "candidate",
  },
  Name: {
    type: String,
  },
  EmailId: {
    type: String,
  },
  image: {
    type: String,
  },
  phoneno: {
    type: Number,
  },
  gender: {
    type: String,
  },
  dateOfBirth: {
    type: String,
  },
  address: {
    type: String,
  },
  degree: {
    type: String,
  },
  SOP: {
    type: String,
  },
  Status: {
    type: String,
  },
  AiRating: {
    type: Number,
  },
  AppliedOn: {
    type: Date,
  },
  Tag: {
    type: String,
  },
  CvUrl: {
    type: String,
  },
  position: {
    type: String,
    ref: "Position",
  },
  score: {
    type: Schema.Types.ObjectId,
    ref: "Score",
  },
});

const positionSchema = new mongoose.Schema({
  title: { type: String },
});

const UserModel = mongoose.model("User", userSchema);
const PositionModel = mongoose.model("Position", positionSchema);
module.exports = {
  UserModel,
  PositionModel,
};
