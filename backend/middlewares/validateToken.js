const jwt = require("jsonwebtoken");

const authRequired = (req, res, next) => {
    const token = req.cookies.token;

    if (jwt) {
        jwt.verify(token, process.env.JWT_KEY, (err, user) => {
            if (err) {
                return res.redirect("/login");
            } else {
                req.user = user;
                next();
            }
        })
    } else {
        // return res.status(401).json({ error: 'User not authorized please log in' })
        return res.redirect("/login");
    }
};

const adminAuth = (req, res, next) => {
    const token = req.cookies.token;

    if (token) {
        jwt.verify(token, process.env.JWT_KEY, (err, user) => {
            if (err) {
                return res.status(401).json({ error: "Token invalido" })
            } else {
                if (user.role != "admin") {
                    return res.status(401).json({ error: "No tienes acceso para entrar a esa URL" })
                } else {
                    next();
                }
            }
        })
    } else {
        return res.status(401).json({ error: "Usuario no autorizado, por favor inicie sesión" })
    }
}

module.exports = {
    authRequired,
    adminAuth
}