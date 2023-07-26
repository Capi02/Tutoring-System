const Router = require("express");
const multer = require("multer");
const {createStudentExcel} = require("../controllers/excel.controller")

const router = Router();

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage });

router.post("/students", upload.single("file"), createStudentExcel);


module.exports = router;