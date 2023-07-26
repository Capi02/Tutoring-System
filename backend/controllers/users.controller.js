const bcrypt = require( "bcryptjs");
const { createAccessToken } = require( "../libs/jwt.js");
const Student = require("../models/Student.model");


const registerStudent = async (req, res, next) => {
    const { nombre, apellidoPaterno, apellidoMaterno, username, password } = req.body;

    try {
        const userFound = await Student.findOne({ username }) 

        if(userFound) {
            return res.status(400).json({error: "El nombre de usuario ya ha sido registrado"})
        }

        const passwordHash = await bcrypt.hash(password, 10)
        
        const newUser = new Student({
            nombre,
            apellidoPaterno,
            apellidoMaterno,
            username,
            password: passwordHash,
        })

        const userSaved = await newUser.save();
        const token = await createAccessToken({
            id: userSaved._id, 
            username: userSaved.username,
            role: userSaved.role
        })
        res.cookie("token", token);
        res.cookie("username", userSaved.username, { signed: true});
        res.cookie("role", userSaved.role, {signed: true});

        res.status(200).json({ message: "Usuario creado correctamente"})

    } catch (err) {
        res.status(401).json({
            error: "Error! El Usuario no se pudo crear",
            error: err.message,
        })
    }
}

const getStudents = async (req, res, next) => {
   
    try {
        const users = await Student.find({ role: "student"});

        const userData = users.map(user => {
            return {
                id: user._id,
                username: user.username,
                password: user.password,
                role: user.role,
                aspectosPersonales: user.aspectosPersonales
            };
        });

        res.status(200).json(userData);
        next();

    } catch (error) {
        console.error("Error obtainning the users: ", error);
        throw error;
    }
}



module.exports = {
    getStudents,
    registerStudent
}