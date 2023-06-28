const Router = require("express");

const router = Router();

router.get("/", (req, res) => {

    const locals = {
        title: "Inicio",
        grid_variable: "#menu_grid"
    }
    res.render("inicio", locals)
})
router.get("/login", (req, res) => {
    
    const locals = {
        title: "Login",

    }
    res.render("login", locals);
})

router.get("/registro", (req, res) => {

    const locals = {
        title: "Registro",
    }
    res.render("registro", locals);
})

router.get("/psicometrico", (req, res) =>{

    const locals = {
        title: "Psicometrico",
    }
    res.render("psicometrico", locals) , {
        // informacion que se envia a la plantilla
        
    };
})

router.get("/tutorias", (req, res) => {

    const locals = {
        title: "Tutorias",
    }
    res.render("tutorias", locals);
})

module.exports = router;