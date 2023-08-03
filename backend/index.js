const express= require("express"); // importandoando express
const dotenv = require( "dotenv");
const morgan = require( "morgan"); // da informacion en la consola acerca del tipo de peticion, tiempo, y peso de la misma
const conectarDB = require("./config/db.js")
const cookieParser = require("cookie-parser");
const pathsRoutes = require("./routes/paths.routes.js");
const authRoutes = require("./routes/auth.routes.js"); 
const usersRoutes = require("./routes/users.routes.js")
const adminPaths = require("./routes/admin.paths.js")
const excelRoutes = require("./routes/excel.routes.js");
const bodyParser = require("body-parser");
const path = require("path");
const TOKEN_SECRET = require("./config.js")
const app = express();

app.use(morgan("dev"));
app.use(cookieParser(TOKEN_SECRET));
app.use(express.json()); // function that will grant access to the user's data from the body
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

// Enabling Pug as a template engine
app.set("view engine", "pug");

// app.use(authRequired);
app.use("/", pathsRoutes);
app.use("/admin", adminPaths);
app.use("/api/auth", authRoutes);
app.use("/api", usersRoutes);
app.use("/api/upload/excel", excelRoutes);


app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '../frontend/public')));

dotenv.config();

conectarDB();

const PORT = process.env.PORT || 4000 // en caso que no haya un puerto será el 4000

app.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}`);
});