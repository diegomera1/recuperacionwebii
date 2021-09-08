const { model, Schema } = require('mongoose');

const ventaSchema = new Schema({
    ciudad: {
        type: String,
        required: true
    },
    gasolineraNombre: {
        type: String,
        required: true
    },
    ventasGasolinaExtra: {
        type: Number,
        required: true
    },
    ventasGasolinaSuper: {
        type: Number,
        required: true
    },
    ventasGasolinaDiesel: {
        type: Number,
        required: true
    },
    ventasGasolinaEcopais: {
        type: Number,
        required: true
    }
});

module.exports = model('venta', ventaSchema);