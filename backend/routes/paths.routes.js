const { authenticateToken, adminAuth } = require("../middlewares/validateToken")
const Router = require("express");
const router = Router();
const Test1 = require("../models/pensamiento.abstracto.model");

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

router.get("/psicometricos", authenticateToken, async (req, res) => {

    const { username, role} = req.user;

    const paQuestions = await Test1.find();

    const locals = {
        title: "Psicometrico",
        username,
        role,
        paQuestions
    }
    res.render("psicometricos", locals), {
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

router.get("/actualizar-password", authenticateToken, (req, res) => {
    const {username, role} = req.user;

    const locals = {
        title: "Actualizar contraseña",
        username,
        role,
    }

    res.render("change-password", locals);
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