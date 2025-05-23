const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const dotenv = require("dotenv");
dotenv.config();
const candidatesRoute = require("./routes/candidates.route");
const authRouter = require("./routes/auth.route");

const uploadCvRoute = require("./routes/uploadCv.route");

app.use(cors({
  origin: 'http://localhost:5173' 
}));
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/candidates", candidatesRoute);
app.use("/auth", authRouter);
app.use("/candidate",uploadCvRoute);


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
