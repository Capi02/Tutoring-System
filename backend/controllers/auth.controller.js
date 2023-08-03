const bcrypt = require("bcryptjs");
const { createAccessToken } = require("../libs/jwt.js");
const Student = require("../models/Student.model.js");
const Teacher = require("../models/Teacher.model.js");
const Admin = require("../models/Admin.model.js");

const login = async (req, res) => {

    const { username, password } = req.body;

    try {
        const student = await Student.findOne({ username });

        if (student) {
            const isMatch = await bcrypt.compare(password, student.password);

            if (isMatch) {
                const token = await createAccessToken({
                    id: student._id,
                    username: student.username,
                    role: student.role,
                });
                res.cookie("token", token, { httpOnly: true });
                res.status(200).json({ message: "Sesión iniciada correctamente!" });
            } else {
                
                res.status(400).json({ error: "La contraseña es incorrecta" });
            }
        } else {
            const teacher = await Teacher.findOne({ username });
            if (teacher) {
              
                const isMatch = await bcrypt.compare(password, teacher.password);

                if (isMatch) {
                    
                    const token = await createAccessToken({
                        id: teacher._id,
                        username: teacher.username,
                        role: teacher.role,
                    });
                    res.cookie("token", token, { httpOnly: true });
                    res.status(200).json({ message: "Sesión iniciada correctamente!" });
                } else {
                    
                    res.status(400).json({ error: "La contraseña es incorrecta" });
                }
            } else {
               
                const admin = await Admin.findOne({ username });

                if (admin) {
                    const isMatch = await bcrypt.compare(password, admin.password);

                    if (isMatch) {
                        
                        const token = await createAccessToken({
                            id: admin._id,
                            username: admin.username,
                            role: admin.role,
                        });
                        res.cookie("token", token, { httpOnly: true });
                        res.status(200).json({ message: "Sesión iniciada correctamente!" });
                    } else {
                        res.status(400).json({ error: "La contraseña es incorrecta" });
                    }
                } else {
                    res.status(400).json({ error: "Usuario no encontrado" });
                }
            }
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const logout = (req, res) => {
    const token = req.cookies.token; // Obtener el token de la cookie

    if (!token) {
        res.redirect('/');
    }

    try {
        res.clearCookie("token", { expires: new Date(0) }); // Eliminar la cookie de token
        res.redirect('/');
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error al cerrar la sesión" });
    }
};



module.exports = {
    login,
    logout,
}