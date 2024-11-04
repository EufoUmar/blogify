const express = require("express")
const path = require("path")
const userRoute = require("./routes/user")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCokie } = require("./middleware/authentication");

const app = express();
const PORT = 8000;

app.set("view engin", "ejs")
app.set("views", path.resolve("./views"))
app.engine('html', require('ejs').renderFile); // Example for EJS
app.set('views', path.join(__dirname, 'views')); // Set the views directory

 
// connection mongoDB
mongoose.connect("mongodb://127.0.0.1:27017/blogify").then((e) => console.log("MongoDB is connected"))


// middleWare
app.use(express.urlencoded({ extended: false}))
app.use(cookieParser());
app.use(checkForAuthenticationCokie("token"));

app.get("/", (req, res) => {
     res.render("home.ejs", {
         user: req.user,
     });
})
app.use("/user", userRoute)

app.listen(PORT, () => console.log(`Server Started At Port ${PORT}`))