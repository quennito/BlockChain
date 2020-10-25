const express = require('express');
const Ente = require('../models/ente');
const ruta = express.Router();

ruta.get ('/', (req, res) => {
    res.json('Listo el Get de ente');
});

ruta.post('/', (req, res)=>{
    let body = req.body;
    let resultado = crearEnte(body);

    resultado.then ( user => {
        res.json({
            valor: user
        })
    }).catch( err => {
        res.status(400).json({
            error: err
        })
    });

});

async function crearEnte(body){
    let ente = new Ente({
        nombre            : body.nombre,
        departamento      : body.departamento,
        direccion         : body.direccion,
        telefono          : body.telefono,
        walletoken        : body.walletoken,

    });
    return await ente.save();
}
module.exports = ruta;