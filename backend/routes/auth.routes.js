const Router = require("express");
const { login, logout, updateAccount, deleteAccount} = require("../controllers/auth.controller.js");

const router = Router();

router.post("/login", login);
router.get("/logout", logout);
router.patch("/update/:id", updateAccount);
router.delete("/delete/:id", deleteAccount)

module.exports = router;