require("./config/db").connect()
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const authRouter = require("./routes/routeUser")

const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())

app.use("/", authRouter)

module.exports = app;