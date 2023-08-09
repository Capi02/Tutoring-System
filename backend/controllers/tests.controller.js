const mongoose = require('mongoose');
const Test1 = require('../models/pensamiento.abstracto.model'); // Reemplaza con la ruta correcta

const paCheckAnswers = async (req, res) => {
    const answers = req.body;

    paQuestions.forEach((question, index) => {
        const selectedAnswerIndex = parseInt(answers[`question_${question._id}`], 10);

        if (selectedAnswerIndex === question.correctAnswerIndex) {
            // La respuesta es correcta
        } else {
            // La respuesta es incorrecta
        }
    });
}

module.exports = paCheckAnswers;

// mongoose.connect("mongodb+srv://capi:capi123@tutoriasdb.drum2vh.mongodb.net/tutoriasdb", {
//     useNewUrlParser: true, 
//     useUnifiedTopology: true
// })
//     .then(() => {
//         console.log('Conexión exitosa a la base de datos');
//         insertarPreguntas(preguntas);
//     })
//     .catch(error => console.error('Error al conectar a la base de datos:', error));

// async function insertarPreguntas(preguntas) {
//     try {
//         await Test1.insertMany(preguntas);
//         console.log('Preguntas insertadas correctamente');
//     } catch (error) {
//         console.error('Error al insertar preguntas:', error);
//     }
// }





