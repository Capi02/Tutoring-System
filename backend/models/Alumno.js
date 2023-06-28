const mongoose = require( "mongoose");

const alumnoSchema = new mongoose.Schema({
    folio: {
        type: Number, 
        required: true,
        trim: true // elimina los espacios en blanco en caso que el usuario puso muchos
    },
    password: {
        type: String,
        required: true,
    },
    informacionPersonal: {
        type: Object,
        default: null
    }

},{
    timestamps: true
});

const Alumno = mongoose.model("Alumno", alumnoSchema)
module.exports = Alumno;