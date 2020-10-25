const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/blockchain', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Conectado a MongoDB...'))
    .catch(err => console.log('No se pudo conectar con MongoDB..', err));

    const beneficiarioSchema = new mongoose.Schema({
        nombre          : String,
        documento       : Number,
        departamento    : String,
        direccion       : String,
        telefono        : String, 
        walletoken      : Number,
        fecha           : {type: Date, default:Date.now},
        status          : Boolean
    });
    const Beneficiario = mongoose.model('Beneficiario', beneficiarioSchema);
    async function crearBeneficiario(){
    const beneficiario = new Beneficiario({
        nombre: 'Ivan Ramis',
        documento: '23886546',
        departamento: 'Artigas',
        direccion: 'Belloni 1234',
        telefono: '096111999',
        walletoken: '0',
        status: true

    })
    const resultado = await beneficiario.save();
    console.log(resultado);
}

const comercioSchema = new mongoose.Schema({
    nombre          : String,
    rut             : Number,
    departamento    : String,
    direccion       : String,
    telefono        : String, 
    walletoken      : Number,
    numcuenta       : Number,
    fecha           : {type: Date, default:Date.now},
    status          : Boolean
});
const Comercio = mongoose.model('Comercio', comercioSchema);
async function crearComercio(){
const comercio = new Comercio({
    nombre: 'Disco',
    rut: '123456',
    departamento: 'Montevideo',
    direccion: 'Curva de Marona',
    telefono: '095888555',
    walletoken: '0',
    numcuenta: '497253828228',
    status: true

})
const resultado = await comercio.save();
console.log(resultado);
}

const enteSchema = new mongoose.Schema({
    nombre          : String,
    departamento    : String,
    direccion       : String,
    telefono        : String, 
    walletoken      : Number,
    fecha           : {type: Date, default:Date.now},
    status          : Boolean
});
const Ente = mongoose.model('Ente', enteSchema);
async function crearEnte(){
const ente = new Ente({
    nombre: 'MIDES',
    departamento: 'Montevideo',
    direccion: '18 de Julio',
    telefono: '29577663',
    walletoken: '10',
    status: true

})
const resultado = await ente.save();
console.log(resultado);
}
//crearBeneficiario();
//crearComercio();
//crearEnte();

async function listarBeneficiario(){
    // eq (equal, igual)
    // ne (not equal, no igual)
    // gt (greater than, mayor que)
    // gte (greater than or egual to, mayor o igual que)
    // lt (less than, menor que)
    // lte (less than or equal to, menor o igual que)
    // in
    // nin (not in)
    // or
    // and
    const numeroPage = 2;
    const sizePage = 3;
    // api/cursos?numeroPage=4&sizePage=10
    const beneficiario = await Beneficiario
        //.find({publicado: true})
        //.find({ precio: {$gte:10, $lte:30}})
        //.find({precio: {$in: [10, 15, 25]}})
        //.find()
        //.and([{autor:'Grover'}, {publicado: false}])
        // Empiece con la palabra Gro
        //.find({ autor: /^Gro/ })
        // Cuando termina en una palabra o expresion
        //.find({ autor: /verr$/ })
        //Cuando un campo tiene un contenido específico        
        .find()
        .skip((numeroPage - 1) * sizePage)
        .limit(sizePage)
        .sort({fecha: -1})
        .select({walletoken:1,nombre:1});
    console.log(beneficiario);
}
//listarBeneficiario();

async function actualizarWalletoken(documento){
    const beneficiario = await Beneficiario.findOne({documento});
    if(!beneficiario) {
        console.log('El Beneficiario no existe');
         return;
     }
    
    beneficiario.walletoken = beneficiario.walletoken+1;

    // curso.set({
    //     publicado: false,
    //     autor: 'Grover Vásquez'
    // })
    const resultado = await beneficiario.save();
    // console.log(resultado);
    //const resultado = await Curso.findByIdAndUpdate(id,{
      //  $set: {
        //    autor:'Luiz',
         //   publicado: true
       // }
   // }, { new: true });
   //const resultado = await beneficiario.update({documento: documento}, {
     //  $set: {
      //  walletoken: '1'
      // }
  // });
    console.log(resultado);
}
actualizarWalletoken('23886546');