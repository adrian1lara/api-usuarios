const mongoose = require("mongoose")
const mongo_uri = `mongodb://localhost:27017/Authentication`

exports.connect = () => {
    try {
        mongoose.connect(mongo_uri)
    } catch (error) {
        console.log("database connection failed")
        console.error(error)
    }
}