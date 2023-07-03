const express= require("express"); // importandoando express
const dotenv = require( "dotenv");
const morgan = require( "morgan"); // da informacion en la consola acerca del tipo de peticion, tiempo, y peso de la misma
const conectarDB = require("./config/db.js")
const cookieParser = require("cookie-parser");
const pathsRoutes = require("./routes/paths.routes.js");
const authRoutes = require("./routes/auth.routes.js"); 
const bodyParser = require("body-parser");
const app = express();
const path = require("path")


app.use(morgan("dev"));
app.use(express.json()); // aqui espeficamos que vamos a estar enviando datos de tipo json
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


// // habilitando PUG
app.set("view engine", "pug");

app.use("/", pathsRoutes);
app.use("/api", authRoutes);

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '../frontend/public')));

dotenv.config();

conectarDB();

const PORT = process.env.PORT || 4000 // en caso que no haya un puerto será el 4000

app.listen(PORT, () => {
    console.log(`Servido funcionando en el servidor ${PORT}`);
});