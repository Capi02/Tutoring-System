const Router = require("express");
const { getUsers } = require("../controllers/users.controller.js")


const router = Router();

router.get("/students", getUsers);


module.exports = router;