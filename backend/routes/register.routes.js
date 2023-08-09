const Router = require("express");
const {registerStudent, registerTeacher, registerPsychologist} = require("../controllers/register.controller")

const router = Router();

router.post("/student", registerStudent);
router.post("/teacher", registerTeacher);
router.post("/psychologist", registerPsychologist);

module.exports = router;