const Router = require("express");
const { register, login, logout, updateAccount, deleteAccount} = require("../controllers/auth.controller.js");



const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.patch("/update/:id", updateAccount);
router.delete("/delete/:id", deleteAccount)

module.exports = router;