import {Router} from "express";

const router = Router();

router.get("/", (req, res) => {
    res.render("inicio")
})
router.get("/login", (req, res) => {
    res.render("login");
})

router.get("register", (req, res) => {
    res.render("register");
})

router.get("psicometrico", (req, res) =>{
    res.render("psicometrico");
})

router.get("tutorias", (req, res) => {
    res.render("tutorias");
})

export default router