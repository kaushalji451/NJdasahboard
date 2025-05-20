const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

const main = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/candiateManagement');
    console.log("connected to DB");
};
module.exports = main;