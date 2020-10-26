const mongoose = require ('mongoose');
const beneficiarioSchema = new mongoose.Schema({
    nombre: {
        type:String,
        required: true
    },
    documento: {
        type:Number,
        required: true
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
        required: false
    },
    status: {
        type: Boolean,
        required: false,
        default: true
    }
});

module.exports = mongoose.model('Beneficiario', beneficiarioSchema);


