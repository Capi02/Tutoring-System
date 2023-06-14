import express from "express"; // importando express
import dotenv from "dotenv";
import morgan from "morgan"; // da informacion en la consola acerca del tipo de peticion, tiempo, y peso de la misma
import conectarDB from "../backend/config/db.js"



import authRoutes  from "./routes/auth.routes.js"; 

const app = express();

app.use(morgan("dev"));

app.use(express.json()); // aqui espeficamos que vamos a estar enviando datos de tipo json

app.use("/api", authRoutes);

dotenv.config();

conectarDB();


const PORT = process.env.PORT || 4000 // en caso que no haya un puerto será el 4000

app.listen(PORT, () => {
    console.log(`Servido funcionando en el servidor ${PORT}`);
});