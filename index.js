const express = require("express");
const path = require("path");
const userRouter = require("./routes/user");
const mongoose = require("mongoose");

const app = express();
const PORT = 8000;


// mongoDB connection

mongoose.connect("mongodb://127.0.0.1:27017/blogify").then(() => {
    console.log("MongoDB connected successfully");
}).catch((err) => {
    console.log("MongoDB connection failed", err);
})

app.set("view engine",  "ejs");
app.set("views", path.resolve("./views"))

app.use(express.urlencoded({ extended: false}))

app.get("/", (req, res) => {
    return res.render("home")
})

app.use("/user", userRouter)


app.listen(PORT, () => {
    console.log(`Server started at PORT ${PORT}`);
})

