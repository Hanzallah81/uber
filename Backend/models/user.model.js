const mongoose = require("mongoose");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        minlenght: [3, "firstname must be at least 3 characters"],
    },
    lastname: {
        type: String,
        minlenght: [3, "lastname must be at least 3 characters"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlenght: [5, "email must be at least 5 characters"],
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String,
    }
    
});



userSchema.methods.generateToken = function () {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET)
    return token;
};
    

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
    
};

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}


const userModel = mongoose.model("user", userSchema);


module.exports = userModel;