const { authenticateToken, adminAuth } = require("../middlewares/validateToken")
const Router = require("express");
const router = Router();

router.get("/", authenticateToken, (req, res) => {
    const { username, role} = req.user;

    const locals = {
        title: "Inicio",
        username,
        role
    }
    res.render("inicio", locals)
})


router.get("/login", (req, res) => {

    const locals = {
        title: "Login"

    }
    res.render("login", locals);
})

router.get("/psicometricos", authenticateToken, (req, res) => {

    const locals = {
        title: "Psicometrico",
        user: req.user.username
    }
    res.render("psicometricos", locals), {
        // informacion que se envia a la plantilla

    };
})

router.get("/tutorias", authenticateToken, (req, res) => {
    const { username, role} = req.user;

    const locals = {
        title: "Tutorias",
        username,
        role
    }
    res.render("tutorias", locals);
})

router.get("/pagina-error", authenticateToken, (req, res) => {

    const errorMessage = req.query.message;

    const locals = {
        title: "Error",
        errorMessage,
    }

    res.render("error", locals)
})

module.exports = router;