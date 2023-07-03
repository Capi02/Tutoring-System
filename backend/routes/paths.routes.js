const Router = require("express");

const router = Router();

router.get("/", (req, res) => {

    const locals = {
        title: "Inicio",
    }
    res.render("inicio", locals)
})
router.get("/login", (req, res) => {
    
    const locals = {
        title: "Login",

    }
    res.render("login", locals);
})

router.get("/registrar", (req, res) => {

    const locals = {
        title: "Registro",
    }
    res.render("register", locals);
})

router.get("/psicometricos", (req, res) =>{

    const locals = {
        title: "Psicometrico",
    }
    res.render("psicometricos", locals) , {
        // informacion que se envia a la plantilla
        
    };

    res.render("psicometricos", locals)
})

router.get("/tutorias", (req, res) => {

    const locals = {
        title: "Tutorias",
    }
    res.render("tutorias", locals);
})

module.exports = router;