const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const candidateSchema = new Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    EmailId: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    Status: {
      type: String,
    },
    AiRating: {
      type: Number,
      required: true,
    },
    AppliedOn: {
      type: Date,
      required: true,
    },
    Tag: {
      type: String,
      required: true,
    },
    CvUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

const userSchema = new Schema(

  {
    email: String,
    password: String,
    username: String,
  }



);

const CandidateModel =mongoose.model("Candidate", candidateSchema);

const UserModel = mongoose.model("User", userSchema);
module.exports = {
  CandidateModel,
  UserModel
};