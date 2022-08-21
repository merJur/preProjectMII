const mongoose = require("mongoose");
const Bird = require("../models/Bird.model")
const BIRD = require ("../data/bird.json")

require("../config/db.config")

mongoose.connection.once("open", () => {
    mongoose.connection.db
    .dropDatabase()
    .then(()=> {
        console.info("BD tirada")
        return Bird.create(BIRD)
    })
    .then((createdBirds) => {
        console.log(" creando aves en BD .....................  🦅🦅🦅")
        createdBirds.forEach((bird) => console.log(`${bird.name} ha sido creado`))

        return mongoose.connection.close()
    })
    .then(() => {
        console.log("conexión cerrada")
        process.exit(1)
    })
    .catch((err) => {
        console.error(err)
        process.exit(0)
    })
})