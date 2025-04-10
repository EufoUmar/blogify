const {Schema, model} = require("mongoose");
const {createHmac, randomBytes} = require("crypto");

const userSchema = new Schema({
    FullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    salt: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profileImageURL: {
        type: String,
        default: "/images/default.jpg",
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
    }
})
userSchema.pre("save", function(next) {
    const user = this;
    if (!user.isModified("password")) return;

    const salt = randomBtytes(16).toString()
    const hashedPassword = createHmac("sha256", salt).update(user.password).digest("hex")
    this.salt = salt;
    this.password = hashedPassword;

    next();
})
const User = model("user", userSchema);