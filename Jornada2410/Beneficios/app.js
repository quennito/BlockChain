const express = require ('express');
const app = express();
const Joi = require ('joi');

app.use(express.json());

const beneficiarios = [
    {documento:1, nombre: 'Fernando'},
    {documento:2, nombre: 'Kenny'},
    {documento:3, nombre: 'Micaela'},
];

app.get('/',(req, res) =>{

    res.send ('Hola UM');
});
app.get('/api/beneficiarios', (req, res) => {
    res.send(beneficiarios);

});

app.get('/api/beneficiarios/:documento',(req, res) => {
    //res.send(req.params);
    //res.send(req.query);
    let beneficiario = beneficiarios.find(b => b.documento === parseInt(req.params.documento));
    if(!beneficiario) res.status(404).send('Error el usuario no existe');
    res.send(beneficiario);
});

app.post('/api/beneficiarios',(req, res) =>{

    const schema = Joi.object({
        nombre: Joi.string().min(3).required()
    });
    const {error, value} = schema.validate({ nombre: req.body.nombre });
    if(!error){
        const beneficiario = {
               documento: beneficiarios.length + 1,
               nombre: value.nombre
           };
           beneficiarios.push(beneficiario);
           res.send(beneficiario);
        
    }else{
        const mensaje = error.details[0].message;
        res.status(400).send(mensaje);
    }
    //if(!req.body.nombre || req.body.nombre.length <=2){
        //400
      //  res.status(400).send('el Nombre debe tener min de 3 caracteres');
       // return;
    //}
   // const beneficiario = {
     //   documento: beneficiarios.length + 1,
       // nombre: req.body.nombre
    //};
    //beneficiarios.push(beneficiario);
    //res.send(beneficiario);
});

app.put('/api/beneficiarios/:documento', (req, res) => {

    let beneficiario = beneficiarios.find(b => b.documento === parseInt(req.params.documento));
    if(!beneficiario) res.status(404).send('Error el usuario no existe');
    
    const schema = Joi.object({
        nombre: Joi.string().min(3).required()
    });
    const {error, value} = schema.validate({ nombre: req.body.nombre });
    if(error){
        const mensaje = error.details[0].message;
        res.status(400).send(mensaje);
        return;     
    }
    
    beneficiario.nombre = value.nombre;
    res.send(`Se actualizo con exito ${beneficiario.nombre}`);


});
app.listen(3000, () => {
    console.log ('server UP..');
} );

//peticion
//app.post(); // envio de datos
//app.put(); //actualizacion
//app.delete(); //eliminacion