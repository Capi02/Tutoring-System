const { authRequired, adminAuth } = require("../middlewares/validateToken")
const {getStudents} = require("../controllers/users.controller")

const Router = require("express");
const router = Router();

router.get("/", authRequired, (req, res) => {
    token = req.cookies.token;

    const locals = {
        title: "Admin",
        user: req.user.username
    }

    res.render("admin/inicio", locals)
})

router.get("/estudiantes", authRequired, (req, res) => {

    const locals = {
        title: "Estudiantes",
        user: req.user.username
    }

    res.render("admin/estudiantes", locals)
})

router.get("/maestros", (req, res) => {

    const locals = {
        title: "Maestros",
        // user: req.user.username
    }

    res.render("admin/maestros", locals)
})

router.get("/psicologos", (req, res) => {

    const locals = {
        title: "Psicólogos",
        // user: req.user.username
    }

    res.render("admin/psicologos", locals)
})

router.get("/agregar", (req, res) => {
    
    const locals = {
        title: "Agregar"
    }

    res.render("admin/agregarUsuarios", locals)
})

module.exports = router;