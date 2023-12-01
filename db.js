const mongoose = require('mongoose');
const uri = "mongodb+srv://reclutador1:jNYYFE8j3egPDfoG@cluster0.tqrttz3.mongodb.net/?retryWrites=true&w=majority";

const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log("Conexion con la base de datos")
    } catch (error) {
        console.log("Error al momento de conectarse con la base de datos", error)
    }
}

module.exports = connectDB;
