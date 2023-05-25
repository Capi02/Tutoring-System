import express from "express"; // importando express
import dotenv from "dotenv";
import conectarDB from "../config/db.js"

const app = express();

dotenv.config();

conectarDB();

app.use("/", (req, res) => { // req = lo que envias, res - la respuesta del servidor
    res.send("Hola Mundo")
});

const PORT = process.env.PORT || 4000 // en caso que no haya un puerto será el 4000

app.listen(PORT, () => {
    console.log(`Servido funcionando en el servidor ${PORT}`);
});