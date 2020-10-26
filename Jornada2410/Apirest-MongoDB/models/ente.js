const mongoose = require ('mongoose');
const enteSchema = new mongoose.Schema({
    nombre: {
        type:String,
        required: true
    },
    rut: {
        type:String,
        required:true
    },
    departamento: {
        type:String,
        required:true
    },
    direccion: {
        type:String,
        required: true
    },
    telefono: {
        type:String,
        required: true
    },
    walletoken: {
        type:Number,
        required: true
    },
     fecha: {
        type: Date,
        default:Date.now,
        required: true
    },
    status: {
        type: Boolean,
        required: false,
        default: true
    }
});

module.exports = mongoose.model('Ente', enteSchema);


