const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre de la categoria es obligatorio']
    },

    estado: {
        type: Boolean,
        default: true,
        required: true
    },

    img: {
        type: String
    },

    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },

    precio: {
        type: Number,
        default: 0
    },

    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },

    descripcion: {
        type: String,
        default: 'Descripción aun no disponible'
    },

    disponible: {
        type: Boolean,
        default: true
    }

});

ProductoSchema.methods.toJSON = function () {
    const { __v, estado, ...data } = this.toObject();
    return data;
}

module.exports = model('Producto', ProductoSchema);