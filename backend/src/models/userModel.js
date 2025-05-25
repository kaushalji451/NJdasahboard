const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        email: String,
        username: {
            type: String,
            required: true,
        },
        password:{
            type:String,
            required:true
        },
        role: {
            type: String,
            required: true,
            enum: ["candidate", "admin"],
            default: "candidate"
        },
    }
);

const positionSchema = new mongoose.Schema({
    title:{type:String, required:true},
})

const UserModel = mongoose.model("User", userSchema);
const PositionModel = mongoose.model("Position", positionSchema);
module.exports = {
    UserModel,
    PositionModel
};