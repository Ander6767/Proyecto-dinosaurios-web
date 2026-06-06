require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("MongoDB conectado"))
.catch(err => console.log(err));

const DinosaurioSchema = new mongoose.Schema({
    nombre: String,
    especie: String,
    periodo: String,
    dieta: String
});

const Dinosaurio = mongoose.model(
    "Dinosaurio",
    DinosaurioSchema
);


// Obtener todos
app.get('/dinosaurios', async(req,res)=>{
    const datos = await Dinosaurio.find();
    res.json(datos);
});

// Crear
app.post('/dinosaurios', async(req,res)=>{
    const nuevo = new Dinosaurio(req.body);
    await nuevo.save();
    res.json(nuevo);
});

// Editar
app.put('/dinosaurios/:id', async(req,res)=>{
    const actualizado =
    await Dinosaurio.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );

    res.json(actualizado);
});

// Eliminar
app.delete('/dinosaurios/:id', async(req,res)=>{
    await Dinosaurio.findByIdAndDelete(
        req.params.id
    );

    res.json({
        mensaje:"Eliminado"
    });
});

const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});
app.listen(PORT, ()=>{
    console.log(`Servidor en puerto ${PORT}`);
});