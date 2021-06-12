const { Schema, model } = require('mongoose');

const transactionSchema = Schema({
    to: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'El destinatario es requerido']
    },

    from: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'El remitente es requerido']
    },

    value: {
        type: Number,
        required: [true, 'El valor de la transacción es requerido']
    },

    currency: {
        type: String,
        default: 'COP'
    },

    delivered: {
        type: Boolean,
        default: false
    },

    deliveredIn: {
        type: Schema.Types.ObjectId,
        ref: 'transaction',
        date: {
            type: Date
        }
    },

    deliveredOut: {
        type: Schema.Types.ObjectId,
        ref: 'transaction',
        required: [true, 'Locación de envio es requerida'],
        date: {
            type: Date,
            required: [true, 'La fecha de envio es requerida']
        }
    },

});


module.exports = model('transaction', transactionSchema);