const express = require("express");
const candidatesRoute = express.Router();
const connectDb = require("../initdb/connectDb");
const Candidates = require("../models/candidates");

connectDb();

candidatesRoute.get("/", async (req, res) => {
  try {
    const data = await Candidates.find({});
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching candidates:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

candidatesRoute.get("/search", async (req, res) => {
  try {
    let { name } = req.query;
    let data = await Candidates.find({
      Name: { $regex: name, $options: "i" },
    });
    res.json({ message: "done", data });
  } catch (error) {
    res.status(500).json({ message: "error", error });
  }
});

candidatesRoute.get("/:id", async (req, res) => {
  let {id} = req.params;
  try {
    let data = await Candidates.findById(id);
    if(data!=null){
      res.status(200).json(data);
    }
  } catch (error) {
    res.status(500).json({message : "No user found"})
  }
});


candidatesRoute.post("/", async (req, res) => {
  try {
    let data = new Candidates(req.body);
    await data.save();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error adding candidate:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


candidatesRoute.put("/:id",async(req,res)=>{
  let {id} = req.params;
  try {
    let data = await Candidates.findByIdAndUpdate(id,req.body);
    if(data!=null){
      res.status(200).json(data);
    }else{
      res.status(404).json({message : "No user found"});
    }
  } catch (error) {
    console.error("Error updating candidate:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

candidatesRoute.delete("/:id",async(req,res)=>{
  let {id} = req.params;
    try {
        let data = await Candidates.findByIdAndDelete(id);
        if(data){
          res.status(200).json(data);
        }else{
          res.status(404).json({message : "No user found"});
        }
    } catch (error) {
      console.error("Error deleting candidate:", error);
      res.status(500).json({ message: "Internal server error" });
    }
})



module.exports = candidatesRoute;
