const express = require('express');
const candidatesRoute = express.Router();
const connectDb = require("../initdb/connectDb");
const Candidates = require("../models/candidates"); 


connectDb();




candidatesRoute.get('/', async(req, res) => {
    try {
        const data = await Candidates.find({});
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching candidates:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});



module.exports = candidatesRoute;