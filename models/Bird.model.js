const mongoose =require("mongoose");

const birdSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, "El nombre es requerido"],
    },
    class: {
        type: String,
        required: [true, "La clase es requerida"]
    },
    description: {
        type: String,
        required: [true, "Una descripción mínima es requerida"]
    },
    habitat :{
        type : String,
        required: [true, "Hábitat es requerido"],
    },
    migration: {
        type: String,
        enum: ["Si", "No"],
    },
    image: {
        type: String,
        default : "https://www.flaticon.com/free-icon/bird_2219694",
    },
})

const Bird = mongoose.model("Bird", birdSchema);

module.exports = Bird;