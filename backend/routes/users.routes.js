const Router = require("express");
const { registerStudent, student, updateStudent, getStudents, registerTeacher, teacher, updateTeacher, getTeachers, registerPsychologist, psychologist, updatePsychologist, getPsychologists, registerAdmin, deleteUser} = require("../controllers/users.controller.js");

const router = Router();

router.post("/register-student", registerStudent);
router.get("/students", getStudents);
router.get("/student/:id", student);
router.patch("/update-student/:id", updateStudent);
router.delete("/delete/:id", deleteUser)


router.post("/register-teacher", registerTeacher);
router.get("/teacher/:id", teacher);
router.patch("/update-teacher/:id", updateTeacher);
router.get("/teachers", getTeachers)


router.post("/register-psychologist", registerPsychologist);
router.get("/psychologist/:id", psychologist);
router.patch("/update-psychologist/:id", updatePsychologist);
router.get("/psychologists", getPsychologists)

router.post("/register-administrator", registerAdmin);



module.exports = router;