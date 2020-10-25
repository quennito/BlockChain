const express = require('express');
const beneficiario = require('../models/beneficiario');
const Beneficiario = require('../models/beneficiario');
const ruta = express.Router();

ruta.get ('/', (req, res) => {
    let resultado = listarBeneficiariosActivos();
    resultado.then(beneficiarios => {
        res.json(beneficiarios)
    }).catch(err => {
        res.status(400).json(
            {
                err
            }
        )
    })
});

ruta.post('/', (req, res)=>{
    let body = req.body;
    let resultado = crearBeneficiario(body);

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

ruta.put('/:documento', (req, res) =>{
    let resultado = actualizarBeneficiario(req.params.documento, req.body);
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

async function crearBeneficiario(body){
    let beneficiario = new Beneficiario({
        nombre            : body.nombre,
        documento         : body.documento,
        departamento      : body.departamento,
        direccion         : body.direccion,
        telefono          : body.telefono,
        walletoken        : body.walletoken
    });
    return await beneficiario.save();
}

async function listarBeneficiariosActivos(){
    let beneficiarios = await Beneficiario.find({"status": true});
    return beneficiarios;
}
async function actualizarBeneficiario(documento, body){
    let beneficiario = await Beneficiario.findOneAndUpdate({"documento": documento}, {
        $set: {
            walletoken: body.walletoken
        }
    }, {new: true});
    return beneficiario;
}
module.exports = ruta;