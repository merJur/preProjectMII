const mongoose =require("mongoose");

const birdSchema = new mongoose.Schema({
    nombre: {
        type: String, 
        required: [true, "El nombre es requerido"],
    },
    nombreCientifico: {
        type: String,
        required: [true, "El nombre cinetífico es requerido"]
    },
    comentario: {
        type: String,
        required: [true, "Un comentario es requerido"]
    },
    peso :{
        type : String,
    },
    tamaño: {
        type: String,
    },
    longevidad: {
       type: String,
    },
    image: {
        type: String,
        default : "https://www.flaticon.com/free-icon/bird_2219694",
    },
})

const Bird = mongoose.model("Bird", birdSchema);

module.exports = Bird;