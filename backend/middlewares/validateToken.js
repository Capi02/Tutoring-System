const  jwt = require("jsonwebtoken");
// const {TOKEN_SECRET} = require("../config.js");

const authRequired = (req, res, next) => {
   const { token } = req.cookies;

   if(!token)
    return res.status(401).json({ message: 'Usuario no autorizado'})

    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
        if(err) return res.status(401).json({ message: 'Token invalido'});

        req.user = user;
        next();   
    })
};

module.exports = authRequired;
