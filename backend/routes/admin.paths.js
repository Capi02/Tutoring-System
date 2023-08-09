const { authenticateToken } = require("../middlewares/validateToken")
const {authenticateRole} = require("../middlewares/verifyRole");
 

const Router = require("express");
const router = Router();

router.get("/", authenticateToken, authenticateRole("admin"), (req, res) => {
    const {username, role} = req.user;

    const locals = {
        title: "Admin",
        username
    }

    res.render("admin/inicio", locals)
})

router.get("/estudiantes", authenticateToken, authenticateRole("admin"), (req, res) => {
    const {username, role} = req.user;

    const locals = {
        title: "Estudiantes",
        username
    }

    res.render("admin/estudiantes", locals)
})

router.get("/maestros",authenticateToken, authenticateRole("admin"), (req, res) => {
    const {username, role} = req.user;

    const locals = {
        title: "Maestros",
        username,
        role,
    }

    res.render("admin/maestros", locals)
})

router.get("/psicologos", authenticateToken, authenticateRole("admin"), (req, res) => {
    const {username, role} = req.user;

    const locals = {
        title: "Psicólogos",
        username
    }

    res.render("admin/psicologos", locals)
})

router.get("/agregar", authenticateToken, authenticateRole("admin"), (req, res) => {
    const {username, role} = req.user;

    const locals = {
        title: "Agregar",
        username
    }

    res.render("admin/agregarUsuarios", locals)
})

module.exports = router;