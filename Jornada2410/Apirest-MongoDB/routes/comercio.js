const express = require('express');
const Comercio = require('../models/comercio');
const ruta = express.Router();

ruta.get ('/', (req, res) => {
    res.json('Listo el Get de comercio');
});

ruta.post('/', (req, res)=>{
    let body = req.body;
    let resultado = crearComercio(body);

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

ruta.put('/:rut', (req, res) =>{
    let resultado = actualizarComercio(req.params.rut, req.body);
    resultado.then ( valor => {
        res.json({
            valor: valor
        })
    }).catch( err => {
        res.status(400).json({
            error: err
        })
    });
})

async function crearComercio(body){
    let comercio = new Comercio({
        nombre            : body.nombre,
        rut               : body.rut,
        departamento      : body.departamento,
        direccion         : body.direccion,
        telefono          : body.telefono,
        walletoken        : body.walletoken,
        numcuenta         : body.numcuenta

    });
    return await comercio.save();
}

async function actualizarComercio(rut, body){
    let comercio = await Comercio.findOneAndUpdate({"rut": rut}, {
        $set: {
            walletoken: body.walletoken
        }
    }, {new: true});
    return comercio;
}
module.exports = ruta;