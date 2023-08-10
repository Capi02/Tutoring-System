const Router = require("express");
const { student, updateStudent, updatePassword, getStudents, teacher, updateTeacher, getTeachers,psychologist, updatePsychologist, getPsychologists, deleteUser} = require("../controllers/users.controller.js");

const router = Router();


router.get("/students", getStudents);
router.get("/student/:id", student);
router.patch("/update-student/:id", updateStudent);
router.post("/update-password", updatePassword);
router.delete("/delete/:id", deleteUser)


router.get("/teacher/:id", teacher);
router.patch("/update-teacher/:id", updateTeacher);
router.get("/teachers", getTeachers)


router.get("/psychologist/:id", psychologist);
router.patch("/update-psychologist/:id", updatePsychologist);
router.get("/psychologists", getPsychologists)





module.exports = router;