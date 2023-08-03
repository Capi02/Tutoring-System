const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
    numeroEmpleado: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
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
        default: "teacher",
    },
},{
    timestamps: true,
});

const Teacher = mongoose.model("teacher", teacherSchema)
module.exports = Teacher;