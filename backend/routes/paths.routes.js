const { authRequired, adminAuth } = require("../middlewares/validateToken")
const { getUserData } = require("../middlewares/data.js")
const { getUsers } = require("../controllers/users.controller")

const Router = require("express");
const router = Router();

router.get("/", authRequired, (req, res) => {
    
    const locals = {
        title: "Inicio",
        token: req.cookies.token,
        user: req.user.username
    }
    res.render("inicio", locals)
})


router.get("/login", (req, res) => {

    const locals = {
        title: "Login"

    }
    res.render("login", locals);
})

router.get("/register", (req, res) => {


    const locals = {
        title: "Register",
    }
    res.render("register", locals);
})

router.get("/psicometricos", authRequired, (req, res) => {
    const { username } = req.user
    const locals = {
        title: "Psicometrico",
        user: req.user.username
    }
    res.render("psicometricos", locals), {
        // informacion que se envia a la plantilla

    };
})

router.get("/tutorias", authRequired, (req, res) => {
    token = req.cookies.token;
    const locals = {
        title: "Tutorias",
        user: req.user.username
    }
    res.render("tutorias", locals);
})

router.get("/error", (req, res) => {

    const locals = {
        title: "Error"
    }

    res.render("error", locals)
})

module.exports = router;