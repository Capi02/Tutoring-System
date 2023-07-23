const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        unique: true,
        required: true,
        trim: true // elimina los espacios en blanco en caso que el usuario puso muchos
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "student",
        required: true,
    },
    aspectosPersonales: {
    type: Object,
    default: null
} 
},{
    timestamps: true
});

const User = mongoose.model("user", userSchema)
module.exports = User;