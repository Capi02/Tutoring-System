const xlsx = require("xlsx");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const Student = require("../models/Student.model");
const Teacher = require("../models/Teacher.model");
const Psychologist = require("../models/Psychologist.model");


const deleteTempFile = (path) => {
    fs.unlink(path, (err) => { // delete the file once the data is saved in the db
        if(err){
            console.error("Error al eliminar el archivo: ", err);
        }
        else{
            console.log("Archivo eliminado correctamente", path)
        }
    })
}

const createStudentExcel = async (req, res) => {

    const usernamesSet = new Set();

    try {
        const { path } = req.file;
        const workbook = xlsx.readFile(path);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(worksheet);

        for (const item of data) {
            const { matricula, nombre, apellidoPaterno, apellidoMaterno, username, password } = item;

            const userAlreadyRegistered = await Student.find({ username: username })
            if (userAlreadyRegistered.length > 0) return res.status(400).json({ error: `El nombre de usuario: ${username}, ya se encuentra registrado` })

            if (usernamesSet.has(username)) {
                return res.status(400).json({ error: `Nombre de usuario duplicado ${username}` })
            }

            usernamesSet.add(username);
            const passwordString = password.toString();
            const passwordHash = await bcrypt.hash(passwordString, 10);

            const newStudent = new Student({
                matricula,
                nombre: nombre.toUpperCase(),
                apellidoPaterno: apellidoPaterno.toUpperCase(),
                apellidoMaterno: apellidoMaterno.toUpperCase(),
                username,
                password: passwordHash,
            });
            await newStudent.save();
        }

        deleteTempFile(path);
        res.json({ message: "Archivo importado correctamente: " });

    } catch (error) {
        res.status(500).json({ error: "Error al importar el archivo." })
    }
}

const createTeacherExcel = async (req, res) => {

    const usernamesSet = new Set();
    try {
        const { path } = req.file;
        const workbook = xlsx.readFile(path);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(worksheet);

        for (const item of data) {
            const { numeroEmpleado, nombre, apellidoPaterno, apellidoMaterno, username, password } = item;

            const userAlreadyRegistered = await Teacher.find({ username: username })
            if (userAlreadyRegistered.length > 0) return res.status(400).json({ error: `El nombre de usuario: ${username}, ya se encuentra registrado` })

            if (usernamesSet.has(username)) {
                return res.status(400).json({ error: `Nombre de usuario duplicado ${username}` })
            }

            usernamesSet.add(username);

            const passwordString = password.toString();
            const passwordHash = await bcrypt.hash(passwordString, 10);

            const newTeacher = new Teacher({
                numeroEmpleado,
                nombre: nombre.toUpperCase(),
                apellidoPaterno: apellidoPaterno.toUpperCase(),
                apellidoMaterno: apellidoMaterno.toUpperCase(),
                username,
                password: passwordHash,
            });
            await newTeacher.save();
        }

        deleteTempFile(path);

        res.json({ message: "Archivo importado correctamente." });

    } catch (error) {
        console.log("Error importing data:", error);
        res.status(500).json({ error: "Error al importar el archivo." })
    }
}

const createPsychologistExcel = async (req, res) => {

    const usernamesSet = new Set();
    try {
        const { path } = req.file;
        const workbook = xlsx.readFile(path);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(worksheet);

        for (const item of data) {
            const { numeroEmpleado, nombre, apellidoPaterno, apellidoMaterno, username, password } = item;

            const userAlreadyRegistered = await Psychologist.find({ username: username })
            if (userAlreadyRegistered.length > 0) return res.status(400).json({ error: `El nombre de usuario: ${username}, ya se encuentra registrado` })

            if (usernamesSet.has(username)) {
                return res.status(400).json({ error: `Nombre de usuario duplicado ${username}` })
            }
            usernamesSet.add(username);

            const passwordString = password.toString();
            const passwordHash = await bcrypt.hash(passwordString, 10);

            const newPsychologist = new Psychologist({
                numeroEmpleado,
                nombre: nombre.toUpperCase(),
                apellidoPaterno: apellidoPaterno.toUpperCase(),
                apellidoMaterno: apellidoMaterno.toUpperCase(),
                username,
                password: passwordHash,
            });
            await newPsychologist.save();
        }

        deleteTempFile(path);

        res.json({ message: "Archivo importado correctamente." });

    } catch (error) {
        console.log("Error importing data:", error);
        res.status(500).json({ error: "Error al importar el archivo." })
    }
}


module.exports = {
    createStudentExcel,
    createTeacherExcel,
    createPsychologistExcel,
}