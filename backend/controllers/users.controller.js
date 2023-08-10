const bcrypt = require("bcryptjs");
const Student = require("../models/Student.model");
const Teacher = require("../models/Teacher.model.js");
const Psychologist = require("../models/Psychologist.model.js");
const Admin = require("../models/Admin.model.js");


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
        return res.status(500).json({ error: error })
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
        user.nombre = nombre.toUpperCase();
        user.apellidoPaterno = apellidoPaterno.toUpperCase();
        user.apellidoMaterno = apellidoMaterno.toUpperCase();
        user.username = username;
        user.password = passwordHash;
        user.role = "student";

        await user.save();
        res.status(200).json({ message: "Información actualizada correctamente" })


    } catch (err) {
        res.status(500).json({ error: err.message })

    }
}

const updatePassword = async (req, res) => {

    const { oldPassword, newPassword, username } = req.body;

    try {

        const student = await Student.findOne({ username: username });

        if (!student) {
            return res.status(404).json({error: 'Alumno no encontrado'});
        }

        const isMatch = await bcrypt.compare(oldPassword, student.password);

        if(!isMatch){
            return res.status(400).json({error: 'La contraseña que ingresó no es correcta'});
        }

        const newPasswordHash = await bcrypt.hash(newPassword, 10);
        student.password = newPasswordHash;
        await student.save();
        res.status(200).json({ message: "Contraseña actualizada correctamente"})

    } catch (error) {
        console.error('Error al cambiar la contraseña:', error);
        res.status(500).send('Error al cambiar la contraseña');
    }
};

const getStudents = async (req, res, next) => {

    try {
        const users = await Student.find({ role: "student" });

        const userData = users.map(user => {
            return {
                id: user._id,
                matricula: user.matricula,
                apellidoPaterno: user.apellidoPaterno,
                apellidoMaterno: user.apellidoMaterno,
                nombre: user.nombre,
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
    try {
        const { id } = req.params;
        const { numeroEmpleado, nombre, apellidoPaterno, apellidoMaterno, username, password } = req.body;

        const teacher = await Teacher.findById(id);

        if (!teacher) {
            return res.status(400).json({ error: "Maestro no encontrado" })
        }

        const passwordHash = await bcrypt.hash(password, 10);

        // assigning the new values
        teacher.numeroEmpleado = numeroEmpleado;
        teacher.nombre = nombre.toUpperCase();
        teacher.apellidoPaterno = apellidoPaterno.toUpperCase();
        teacher.apellidoMaterno = apellidoMaterno.toUpperCase();
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

    try {
        const { id } = req.params;
        const { numeroEmpleado, nombre, apellidoPaterno, apellidoMaterno, username, password } = req.body;

        const psychologist = await Psychologist.findById(id);

        if (!psychologist) {
            return res.status(400).json({ error: "Psicólogo no encontrado" })
        }

        const passwordHash = await bcrypt.hash(password, 10);

        // assigning the new values
        psychologist.numeroEmpleado = numeroEmpleado;
        psychologist.nombre = nombre.toUpperCase();
        psychologist.apellidoPaterno = apellidoPaterno.toUpperCase();
        psychologist.apellidoMaterno = apellidoMaterno.toUpperCase();
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
                apellidoMaterno: psychologist.apellidoMaterno,
                username: psychologist.username,
                nombre: psychologist.nombre,
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
    student,
    updateStudent,
    updatePassword,
    getStudents,
    teacher,
    updateTeacher,
    getTeachers,
    psychologist,
    updatePsychologist,
    getPsychologists,
    deleteUser,
}