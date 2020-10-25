const express = require ('express');
const mongoose = require ('mongoose');
const beneficiario = require('./routes/beneficiario');
const comercio = require('./routes/comercio');
const ente = require('./routes/ente');

//Conect to DB
mongoose.connect('mongodb://localhost:27017/blockchain', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Conectado a MongoDB...'))
    .catch(err => console.log('No se pudo conectar con MongoDB..', err));

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/beneficiario', beneficiario);
app.use('/api/comercio', comercio);
app.use('/api/ente', ente);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Api RESTFul Ok, y ejecutándose...');
})