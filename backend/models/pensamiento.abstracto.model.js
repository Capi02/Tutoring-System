const mongoose = require("mongoose");

const test1Schema = new mongoose.Schema({
    questionText: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true
    },
    correctAnswerIndex: {
        type: Number,
        required: true,
    }
})

const Test1 = mongoose.model("pensamientoAbstracto", test1Schema);
module.exports = Test1;