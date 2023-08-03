const jwt = require("jsonwebtoken");

const authenticateRole = (requiredRole) => {
    return (req, res, next) => {
        const userRole = req.user.role;

        if (userRole === requiredRole) {
            next();
        } else {
            return res.redirect('/pagina-error?message=No+cuentas+con+los+permisos+necesarios+para+acceder+a+esta+URL');
        }
    }
}

module.exports = {
    authenticateRole,
}