const express = require("express");
const User = require("../models/user.js");

const router = express.Router();

router.get("/login", (req, res) => {
    return res.render("login")
})

router.get("/signup", (req, res) => {
    return res.render("signup")
})


router.post("/signup", async(req, res) => {
    const {FullName, email, password} = req.body;
    console.log(FullName, email, password);
    
    if (!FullName || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }
    await User.create({
        FullName,
        email,
        password,
    }).then(() => {
        return res.redirect("home")
    }).catch((err) => {
        console.log(err);
        return res.status(500).send("Internal Server Error")
    })
});

module.exports = router;