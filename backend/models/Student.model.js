const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    apellidoPaterno: {
        type: String,
        required: true,
        trim: true,
    },
    apellidoMaterno: {
        type: String,
        required: true,
        trim: true,
    },
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
//     aspectosPersonales: {
//     type: Object,
//     default: null
// } 
},{
    timestamps: true,
    strict: false
});

const Student = mongoose.model("student", studentSchema)
module.exports = Student;