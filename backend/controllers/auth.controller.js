const bcrypt = require( "bcryptjs");
const { createAccessToken } = require( "../libs/jwt.js");
const User = require("../models/User")

const register = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const userFound = await User.findOne({ username }) 

        if(userFound) {
            return res.status(400).json({error: "El nombre de usuario ya ha sido registrado"})
        }

        const passwordHash = await bcrypt.hash(password, 10)
        
        const newUser = new User({
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

const login = async (req, res) => {

    const { username, password } = req.body;

    try {
        const userFound = await User.findOne({username})

        if (!userFound) return res.status(400).json({ error: "Usuario no encontrado"});

        const isMatch = await bcrypt.compare(password, userFound.password) //  si si encontro un alumno entonces compara las contraseñas

        if (!isMatch) return res.status(400).json({ error: "La contraseña es incorrecta" });

    
        const token = await createAccessToken({
            id: userFound._id, 
            username: userFound.username,
            role: userFound.role
        })
        res.cookie("token", token);
        res.cookie("username", userFound.username, { signed: true});
        res.cookie("role", userFound.role, {signed: true} );
        res.status(200).json({message: "Sesión iniciada correctamente!"})
        
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}

const logout = (req, res) => {
    const token = req.cookies.token; // Obtener el token de la cookie
  
    if (token) {
      res.clearCookie("token", { expires: new Date(Date.now() - 1) }); // Eliminar la cookie de token
      res.clearCookie("username", {expires: new Date(Date.now() - 1)});
      res.clearCookie("role", {expires: new Date(Date.now() - 1)});
    }
    res.redirect('/'); // Redireccionar al inicio u otra página adecuada
  };


const updateAccount = async (req, res) => {
    const { id } = req.params;
    const { username, password, role} = req.body;

    try {
        const user = await User.findById(id);

        if(!user){
            return res.status(400).json({ error: "Usuario no encontrado"})
        }

        const passwordHash = await bcrypt.hash( password, 10);

        // assigning the new values
        user.username = username;
        user.password = passwordHash;
        user.role = role;

        await user.save();
        res.status(200).json({ message: "User actualizado correctamente"})
       

    } catch (err) {
        res.status(500).json({error: err.message})
        
    }
}

const deleteAccount = async (req, res) => {

    const {id} = req.params;

    const userToDelete = await User.findByIdAndDelete(id);

    if(!userToDelete){
        return res.status(400).json({ error: "Usuario no encontrado"})
    }

    return res.json({message: "Usuario eliminado"})
}

const perfil = async (req, res) => {
    const userFound = await  User.findById(req.user.id)
    
    if(!userFound) return res.status(404).json({ error: "Usuario no encontrado" });
    
    return res.json({
        id: userFound._id,
        username: userFound.username,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    })
}



module.exports = {
    register,
    login,
    logout,
    updateAccount,
    deleteAccount,
    perfil,
}