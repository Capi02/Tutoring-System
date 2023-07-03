const Router = require("express");
const { registrar, login, logout, perfil}= require("../controllers/auth.controller.js");
const authRequired = require("../middlewares/validateToken.js");
const validateSchema = require("../middlewares/validatorMiddleware.js");
const {registerSchema, loginSchema} = require("../schemas/auth.schema.js");

const router = Router();

router.post("/registrar", validateSchema(registerSchema), registrar);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);
router.get("/perfil", authRequired, perfil);



module.exports = router;