const Router = require("express");
const { registerStudent, getStudents } = require("../controllers/users.controller.js");


const router = Router();

router.post("/register-student", registerStudent);
router.get("/students", getStudents);
router.get("/teachers", )


module.exports = router;