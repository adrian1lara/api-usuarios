const bcrypt = require("bcryptjs")
const User = require("../model/user")


exports.createUser = async (req, res) => {
    try {
        const {nombres, apellidos, correo, password} = req.body
        if(!nombres || !correo || !apellidos || !password) {
            return res.status(400).json("Todos los campos deben estar completos")
        }

        const oldUser = await User.findOne({correo})

        if(oldUser) {
            return res.status(400).json("Este usuario ya existe, porfavor log in")
        }

        const hashedpassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            nombres,
            apellidos,
            correo, 
            password: hashedpassword
        })

        return res.status(201).json({usuario: user, message: "usuario creado exitosamente"})
    } catch (error) {
        console.error("Error al crear usuario", error)
        return res.status(500).json({error: error.message})
    }
}

exports.loginUser = async (req, res) => {
    try {
        const {correo, password} = req.body

        if(!(correo  && password)) {
            return res.status(400).json("Todos los campos son requeridos")
        }

        const user = await User.findOne({correo})

        if (user && (bcrypt.compare(password, user.password))) {
            return res.status(200).json({usuario: user, message: "login existoso"})
        }

        return res.status(400).json("Correo o password incorrecto")
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: error.message})
    }
}