import moongose from "mongoose";


const conectarDB = async() => {
    try {
        const db = await moongose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }); // url de la conexión
    
        const url = `${db.connection.host}:${db.connection.port}`
        console.log(`MongoDB conectado en: ${url}`);
        
    } catch (error) {
        console.log(`error: ${error}`);
        process.exit(1)
    }
}

export default conectarDB;