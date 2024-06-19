const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    nombres: { type: String} ,
    apellidos: {type: String},
    correo: {type: String, unique: true},
    password : { type: String}
})

module.exports = mongoose.model("User", userSchema)