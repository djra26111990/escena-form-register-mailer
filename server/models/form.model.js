const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
    nombre: {
        type : String,
        required : true
    },
    apellido: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    nombreNino: {
        type: String,
        required: true
    },
    apellidoNino: {
        type: String,
        required: true
    },
    ciudad: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('form-registro',FormSchema);