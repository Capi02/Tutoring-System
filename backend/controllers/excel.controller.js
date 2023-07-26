const xlsx = require("xlsx");
const multer = require("multer");
const Student = require("../models/Student.model");
const Teacher = require("../models/Teacher.model");
const Psychologist = require("../models/Psychologist.model");

const createStudentExcel = async (req, res) => {
    try {
        const { path } = req.file;
        const workbook = xlsx.readFile(path);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(worksheet);

        for (const item of data) {
            const newStudent = new Student({
                nombre: item.nombre,
                apellidoPaterno: item.apellidoPaterno,
                apellidoMaterno: item.apellidoMaterno,
                username: item.username,
                password: item.password,
                role: item.role,
            });
            await newStudent.save();
        }

        res.json({ message: "Archivo importado correctamente." });

    } catch (error) {
        console.log("Error importing data:", error);
        res.status(500).json({ error: "Error al importar el archivo." })
    }
}

module.exports = {
    createStudentExcel,
}