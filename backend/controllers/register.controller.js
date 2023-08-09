const bcrypt = require("bcryptjs");
const Student = require("../models/Student.model");
const Teacher = require("../models/Teacher.model.js");
const Psychologist = require("../models/Psychologist.model.js");
const Admin = require("../models/Admin.model.js");

const registerStudent = async (req, res, next) => {
    const { matricula, nombre, apellidoPaterno, apellidoMaterno, username, password } = req.body;

    try {
        const userFound = await Student.findOne({ username })

        if (userFound) {
            return res.status(400).json({ error: "El nombre de usuario ya ha sido registrado" })
        }

        const existingMatricula = await Student.findOne({ matricula });
        if (existingMatricula) {
            return res.status(400).json({ error: "La matrícula que ingresó ya está registrada" });
        }

        if (matricula.length > 10) {
            return res.status(400).json({ error: "El campo Matrícula no puede tener mas de 10 caracteres" })
        }

        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = new Student({
            matricula,
            nombre: nombre.toUpperCase(),
            apellidoPaterno: apellidoPaterno.toUpperCase(),
            apellidoMaterno: apellidoMaterno.toUpperCase(),
            username,
            password: passwordHash,
        })

        await newUser.save();
        res.status(200).json({ message: "Usuario creado correctamente" })

    } catch (err) {
        res.status(401).json({
            error: "Error! Hubo un error al crear al usuario",
            error: err.message,
        })
    }
}

const registerTeacher = async (req, res) => {
    const { numeroEmpleado, nombre, apellidoPaterno, apellidoMaterno, username, password } = req.body;

    try {
        const teacherFound = await Teacher.findOne({ username })
        if (teacherFound) return res.status(400).json({ error: "El nombre de usuario ya ha sido registrado" });

        const passwordHash = await bcrypt.hash(password, 10);

        const newTeacher = new Teacher({
            numeroEmpleado,
            nombre: nombre.toUpperCase(),
            apellidoPaterno: apellidoPaterno.toUpperCase(),
            apellidoMaterno: apellidoMaterno.toUpperCase(),
            username,
            password: passwordHash,
        })

        await newTeacher.save();
        res.status(200).json({ message: "Maestro creado correctamente" })

    } catch (error) {
        res.status(401).json({
            error: "Error! Hubo un error al crear al maestro",
            error: err.message,
        })
    }
}


const registerPsychologist = async (req, res) => {

    try {
        const { numeroEmpleado, nombre, apellidoPaterno, apellidoMaterno, username, password } = req.body;

        const psychologistFound = await Psychologist.findOne({ username })
        if (psychologistFound) return res.status(400).json({ error: "El nombre de usuario ya ha sido registrado" });

        const passwordHash = await bcrypt.hash(password, 10);

        const newPsychologist = new Psychologist({
            numeroEmpleado,
            nombre: nombre.toUpperCase(),
            apellidoPaterno: apellidoPaterno.toUpperCase(),
            apellidoMaterno: apellidoMaterno.toUpperCase(),
            username,
            password: passwordHash,
        })

        await newPsychologist.save();
        res.status(200).json({ message: "Psicólogo creado correctamente" })

    } catch (error) {
        res.status(401).json({
            error: "Error! Hubo un error al crear al Psicólogo",
            error: err.message,
        })
    }
}

const registerAdmin = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        const adminFound = await Admin.findOne({ username });
        if (adminFound) return res.status(400).json({ error: "El nombre de usuario ya ha sido registrado" })

        const newAdmin = new Admin({
            username,
            password,
            role,
        })

        await newAdmin.save();
        res.status(200).json({ message: "Administrador creado correctamente" })

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    registerStudent,
    registerTeacher,
    registerPsychologist,
    registerAdmin,


}