const createError = require("http-errors");

//CRUD

const Bird = require("../models/Bird.model");

//READ
module.exports.list = (req, res, next) => {
    Bird.find()
    .then((birds) => {
        res.render("bird/list", {birds})
    })
    .catch((err) => next(err))
}

module.exports.birdDetail = (req, res, next) => {
    const {id} = req.params;

    Bird.findById(id)
    .then((bird) => {
        console.log(bird);
        res.render("bird/detail", {bird})
    })
    .catch((err) => {
        next(createError(404, "Ave no encontrada"))
    })
}

//CREATE
module.exports.create = (req, res, next) => {
    res.render("bird/create")
}

module.exports.doCreate = (req, res, next) => {
    Bird.create(req.body)
    .then((bird) => {
        console.log(bird)
        res.redirect("bird/list")
    })
    .catch(next)
}

// UPDATE / EDIT
module.exports.edit = (req, res, next) => {
    const {id} = req.params;

    Bird.findById(id).then((bird) => {
        res.render("bird/create", {bird, isEdit: true})
    })
}
module.exports.doEdit = (req, res, next) => {
    const {id} = req.params;
    Bird.findByIdAndUpdate(id, req.body, {new: true})
    .then((bird) => {
        console.log({bird});
        res.redirect(`/bird/${bird.id}`)
    })
}

//DELETE

module.exports.delete = (req, res, next) => {
    const {id} = req.params;
    Bird.findByIdAndDelete(id)
    .then(()=>{
        res.redirect("/birds")
    })
    .catch(next)
}