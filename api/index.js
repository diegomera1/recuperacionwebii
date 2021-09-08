require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

// Modelo
const ventaModel = require('./venta.model');

// Middlewares logicos
app.use(express.json());
app.use(cors());

// CRUD
const ventaApi = express.Router();

// Get
ventaApi.get('/', async (request, response, next) => {
    try {
        const ventas = await ventaModel.find();

        return response.status(200).send(ventas);
    } catch (error) {
        next(error);
    }
});

// Get by id
ventaApi.get('/:ventaId', async (request, response, next) => {
    try {
        const { ventaId } = request.params;

        const venta = await ventaModel.findById(ventaId);

        return response.status(200).send(venta);
    } catch (error) {
        next(error);
    }
});

// Post
ventaApi.post('/', async (request, response, next) => {
    try {
        const venta = request.body;
        const ventaCreated = await ventaModel.create(venta);
        return response.status(201).send(ventaCreated);
    } catch (erorr) {
        next(error);
    }
})

// Patch
ventaApi.patch('/:ventaId', async (request, response, next) => {
    try {
        const { ventaId } = request.params;
        const venta = request.body;
        const ventaUpdated = await ventaModel.findByIdAndUpdate(ventaId, venta);
        return response.send(ventaUpdated);
    } catch (error) {
        next(error);
    }
});

// Put
ventaApi.put('/:ventaId', async (request, response, next) => {
    try {
        const { ventaId } = request.params;
        const venta = request.body;
        const ventaUpdated = await ventaModel.findByIdAndUpdate(ventaId, venta);
        return response.send(ventaUpdated);
    } catch (error) {
        next(error);
    }
});

// Delete
ventaApi.delete('/:ventaId', async (request, response, next) => {
    try {
        const { ventaId } = request.params;
        const ventaDeleted = await ventaModel.findByIdAndDelete(ventaId);
        return response.send(ventaDeleted);
    } catch (error) {
        next(error);
    }
});
app.use('/api/v1/venta', ventaApi);

// Middlewares logicos
app.use((error, request, response, next) => {
    if(error) return response.status(400).send({msg: 'Error'});

    next();
})

app.use((request, response) => {
    return response.status(404).send({
        msg: '404'
    });
})

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI).then(() => {
    app.listen(PORT, () => console.log('Listen at http://127.0.0.1:' + PORT));
}).catch(error => console.error(error));

