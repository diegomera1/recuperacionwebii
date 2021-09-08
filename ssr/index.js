const { PORT } = require('./config');

const hbs = require('hbs');
const express = require('express');
const path = require('path');

// Services
const { ventaService } = require('./services');

// APP
const app = express();

app.use(express.urlencoded());

// Motor de plantilla
hbs.registerPartials(path.join(__dirname, '/views/partials'));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', async (request, response) => {
    const ventas = await ventaService.getAll();
    return response.render('home', { ventas });
});

app.get('/crear', async (request, response) => {
    return response.render('crear');
});

app.post('/crear', async (request, response) => {
    const {ciudad, gasolineraNombre, ventasGasolinaExtra, ventasGasolinaSuper, ventasGasolinaDiesel, ventasGasolinaEcopais} = request.body;

    const venta = {
        ciudad,
        gasolineraNombre,
        ventasGasolinaExtra: parseInt(ventasGasolinaExtra),
        ventasGasolinaSuper: parseInt(ventasGasolinaSuper),
        ventasGasolinaDiesel: parseInt(ventasGasolinaDiesel),
        ventasGasolinaEcopais: parseInt(ventasGasolinaEcopais)
    };

    const ventaCreated = await ventaService.create(venta);
    console.log(ventaCreated);

    return response.render('crear');
})

app.get('/editar/:ventaId', async(request, response) => {
    const { ventaId } = request.params;
    const venta = await ventaService.get(ventaId);
    console.log({...venta});
    return response.render('editar', {...venta});
});

app.post('/editar/:ventaId', async(request, response) => {
    const { ventaId } = request.params;

    const {ciudad, gasolineraNombre, ventasGasolinaExtra, ventasGasolinaSuper, ventasGasolinaDiesel, ventasGasolinaEcopais} = request.body;

    const venta = {
        ciudad,
        gasolineraNombre,
        ventasGasolinaExtra: parseInt(ventasGasolinaExtra),
        ventasGasolinaSuper: parseInt(ventasGasolinaSuper),
        ventasGasolinaDiesel: parseInt(ventasGasolinaDiesel),
        ventasGasolinaEcopais: parseInt(ventasGasolinaEcopais)
    };

    const ventaUpdated = await ventaService.update(ventaId, venta);
    return response.redirect('/editar/' + ventaId);
});

app.get('/eliminar/:ventaId', async (request, response) => {
    const { ventaId } = request.params;
    const ventaDeleted = await ventaService.delete(ventaId);

    return response.redirect('/');
})

// Iniciar servidor
app.listen(PORT, () => console.log('Listening at http://127.0.0.1:' + PORT));
