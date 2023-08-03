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

        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = new Student({
            matricula,
            nombre,
            apellidoPaterno,
            apellidoMaterno,
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

const student = async (req, res) => {
    try {
        const { id } = req.params;

        const studentInformation = await Student.findById({ _id: id }).select("matricula nombre apellidoPaterno apellidoMaterno username password")

        if (studentInformation) {
            return res.status(200).json({ studentInformation })
        } else {
            return res.status(404).json({ error: "Estudiante no encontrado" })
        }
    } catch (error) {
        return res.status(500).json({ error: error})
    }
}

const updateStudent = async (req, res) => {
    const { id } = req.params;
    const { matricula, nombre, apellidoPaterno, apellidoMaterno, username, password } = req.body;

    try {
        const user = await Student.findById(id);

        if (!user) {
            return res.status(400).json({ error: "Usuario no encontrado" })
        }

        const passwordHash = await bcrypt.hash(password, 10);

        // assigning the new values
        user.matricula = matricula;
        user.nombre = nombre;
        user.apellidoPaterno = apellidoPaterno;
        user.apellidoMaterno = apellidoMaterno;
        user.username = username;
        user.password = passwordHash;
        user.role = "student";

        await user.save();
        res.status(200).json({ message: "Información actualizada correctamente" })


    } catch (err) {
        res.status(500).json({ error: err.message })

    }
}


const getStudents = async (req, res, next) => {

    try {
        const users = await Student.find({ role: "student" });

        const userData = users.map(user => {
            return {
                id: user._id,
                matricula: user.matricula,
                apellidoPaterno: user.apellidoPaterno,
                apellidoMaterno: user.apellidoMaterno,
                username: user.username,
                password: user.password,
                role: user.role,
            };
        });

        res.status(200).json(userData);
        next();

    } catch (error) {
        console.error("Error obtainning the users: ", error);
        throw error;
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
            nombre,
            apellidoPaterno,
            apellidoMaterno,
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

const teacher = async (req, res) => {
    try {
        const { id } = req.params;

        const teacherInformation = await Teacher.findById({ _id: id }).select("numeroEmpleado nombre apellidoPaterno apellidoMaterno username password")

        if (teacherInformation) {
            return res.status(200).json({ teacherInformation })
        } else {
            return res.status(404).json({ error: "Estudiante no encontrado" })
        }
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const updateTeacher = async (req, res) => {
    const { id } = req.params;
    const { numeroEmpleado, nombre, apellidoPaterno, apellidoMaterno, username, password } = req.body;

    try {
        const teacher = await Teacher.findById(id);

        if (!teacher) {
            return res.status(400).json({ error: "Maestro no encontrado" })
        }

        const passwordHash = await bcrypt.hash(password, 10);

        // assigning the new values
        teacher.numeroEmpleado = numeroEmpleado;
        teacher.nombre = nombre;
        teacher.apellidoPaterno = apellidoPaterno;
        teacher.apellidoMaterno = apellidoMaterno;
        teacher.username = username;
        teacher.password = passwordHash;
        teacher.role = "teacher";

        await teacher.save();
        res.status(200).json({ message: "Información actualizada correctamente" })


    } catch (err) {
        res.status(500).json({ error: err.message })

    }
}

const getTeachers = async (req, res, next) => {

    try {
        const teachers = await Teacher.find({ role: "teacher" });

        const userData = teachers.map(teacher => {
            return {
                id: teacher._id,
                numeroEmpleado: teacher.numeroEmpleado,
                apellidoPaterno: teacher.apellidoPaterno,
                apellidoMaterno: teacher.apellidoMaterno,
                username: teacher.username,
                password: teacher.password,
                role: teacher.role,
            };
        });

        res.status(200).json(userData);
        next();

    } catch (error) {
        console.error("Error obtainning the teachers: ", error);
        throw error;
    }
}

const registerPsychologist = async (req, res) => {
    const { numeroEmpleado, nombre, apellidoPaterno, apellidoMaterno, username, password } = req.body;

    try {
        const psychologistFound = await Psychologist.findOne({ username })
        if (psychologistFound) return res.status(400).json({ error: "El nombre de usuario ya ha sido registrado" });

        const passwordHash = await bcrypt.hash(password, 10);

        const newPsychologist = new Psychologist({
            numeroEmpleado,
            nombre,
            apellidoPaterno,
            apellidoMaterno,
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
const psychologist = async (req, res) => {
    try {
        const { id } = req.params;

        const psychologistInformation = await Psychologist.findById({ _id: id }).select("numeroEmpleado nombre apellidoPaterno apellidoMaterno username password")

        if (psychologistInformation) {
            return res.status(200).json({ psychologistInformation })
        } else {
            return res.status(404).json({ error: "Estudiante no encontrado" })
        }
    } catch (error) {
        console.log(error)
    }
}

const updatePsychologist = async (req, res) => {
    const { id } = req.params;
    const { numeroEmpleado, nombre, apellidoPaterno, apellidoMaterno, username, password } = req.body;

    try {
        const psychologist = await Psychologist.findById(id);

        if (!psychologist) {
            return res.status(400).json({ error: "Psicólogo no encontrado" })
        }

        const passwordHash = await bcrypt.hash(password, 10);

        // assigning the new values
        psychologist.numeroEmpleado = numeroEmpleado;
        psychologist.nombre = nombre;
        psychologist.apellidoPaterno = apellidoPaterno;
        psychologist.apellidoMaterno = apellidoMaterno;
        psychologist.username = username;
        psychologist.password = passwordHash;
        psychologist.role = "psychologist";

        await psychologist.save();
        res.status(200).json({ message: "Información actualizada correctamente" })


    } catch (err) {
        res.status(500).json({ error: err.message })

    }
}

const getPsychologists = async (req, res, next) => {

    try {
        const psychologists = await Psychologist.find({ role: "psychologist" });

        const userData = psychologists.map(psychologist => {
            return {
                id: psychologist._id,
                numeroEmpleado: psychologist.numeroEmpleado,
                apellidoPaterno: psychologist.apellidoPaterno,
                apellidoMaterno: psychologist.apellidoPaterno,
                username: psychologist.username,
                password: psychologist.password,
                role: psychologist.role,
            };
        });

        res.status(200).json(userData);
        next();

    } catch (error) {
        console.error("Error obtainning the psychologists: ", error);
        throw error;
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

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        let deleteResult;

        // Intenta eliminar el usuario en el modelo Student
        deleteResult = await Student.findByIdAndDelete(id);
        if (deleteResult) {
            return res.json({ message: "Usuario eliminado correctamente" });
        }

        // Intenta eliminar el usuario en el modelo Psychologist
        deleteResult = await Psychologist.findByIdAndDelete(id);
        if (deleteResult) {
            return res.json({ message: "Usuario eliminado correctamente" });
        }

        // Intenta eliminar el usuario en el modelo Teacher
        deleteResult = await Teacher.findByIdAndDelete(id);
        if (deleteResult) {
            return res.json({ message: "Usuario eliminado correctamente" });
        }

        // Si el usuario no se encuentra en ninguno de los modelos, se devuelve un error
        return res.status(404).json({ error: "Usuario no encontrado" });

    } catch (error) {
        // En caso de que ocurra un error durante el proceso de eliminación
        return res.status(500).json({ error: "Error al eliminar el usuario" });
    }
}


module.exports = {
    registerStudent,
    student,
    updateStudent,
    getStudents,
    registerTeacher,
    teacher,
    updateTeacher,
    getTeachers,
    registerPsychologist,
    psychologist,
    updatePsychologist,
    getPsychologists,
    registerAdmin,
    deleteUser,
}