const bcrypt = require( "bcryptjs");
const Alumno = require( "../models/Alumno.js");
const { createAccessToken } = require( "../libs/jwt.js");

const registrar = async (req, res) => {

    console.log(req.body)
    const { folio, password, informacionPersonal } = req.body;

    try {

        const alumnoEncontrado = await Alumno.findOne({folio}) // busca si el folio ya esta repetido
        if(alumnoEncontrado){ // si si está repetido
            return res.status(400).json(["El folio que ingresaste, ya está registrado"]) // manda el siguiente mensaje
        }

        const passwordHash = await bcrypt.hash(password, 10) //  askdjfksfj13t5
        const nuevoAlumno = new Alumno({
            folio,
            password: passwordHash,
            informacionPersonal
        })

        const alumnoGuardado = await nuevoAlumno.save();
        const token = await createAccessToken({id: alumnoGuardado._id})
        res.cookie("token", token);
        res.json({
            id: alumnoGuardado._id,
            folio: alumnoGuardado.folio,
            informacionPersonal: alumnoGuardado.informacionPersonal,
            createdAt: alumnoGuardado.createdAt,
            updatedAt: alumnoGuardado.updatedAt
        });

       

    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}

const login = async (req, res) => {

    const { folio, password } = req.body;

    try {
        const alumnoEncontrado = await Alumno.findOne({folio})

        if (!alumnoEncontrado) return res.status(400).json({ message: "Alumno no encontrado"});

        const isMatch = await bcrypt.compare(password, alumnoEncontrado.password) //  si si encontro un alumno entonces compara las contraseñas

        if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" })

        const token = await createAccessToken({id: alumnoEncontrado._id})

        res.cookie("token", token);
        res.status(200).json({ message: "Session Iniciada"})
      

    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}

const logout = (req, res) => {
    res.cookie("token", token,{
        expires: new Date(0),
    });

    return res.sendStatus(200);
}

const perfil = async (req, res) => {
    const usuarioEncontrado = await  Alumno.findById(req.user.id)
    
    if(!usuarioEncontrado) return res.status(404).json({ message: "Usuario no encontrado" });
    
    return res.json({
        id: usuarioEncontrado._id,
        folio: usuarioEncontrado.folio,
        createdAt: usuarioEncontrado.createdAt,
        updatedAt: usuarioEncontrado.updatedAt,
    })
}

module.exports = {
    registrar,
    login,
    logout,
    perfil
}