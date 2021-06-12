const { Schema, model } = require('mongoose');

const cashboxSchema = Schema({
    location: {
        type: String,
        required: [true, 'la locación de la caja es requerida']
    },

    freight: {
        type: Number,
        required: [true, 'El flete para las transacciones es requerido']
    },
    
    cash: {
        type: Number,
        required: [true, 'la base de la caja es requerida']
    }
});

module.exports = model('cashbox', cashboxSchema);