const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
        set: function(password){
            return bcrypt.hashSync(password, 10);
        }
    },
    role: {
        type: String,
        required: true,
        
    },
},{
    timestamps: true,
})

const Admin = mongoose.model("admin", adminSchema)
module.exports = Admin;