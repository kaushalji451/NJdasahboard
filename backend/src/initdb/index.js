const initdata = require("./data");
const dotenv = require("dotenv")
const Candidate = require("../models/candidates");
dotenv.config();

const connectDb = require("./connectDb");
connectDb();

const initDb = async () => {
let data = await Candidate.insertMany(initdata);
console.log("data was initilize",data);
};
initDb();
