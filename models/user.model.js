
const { Schema, model } = require('mongoose');

const userSchema = Schema({
    firstName: {
        type: String,
        required: [true, 'Los nombres son requeridos']
    },

    lastName: {
        type: String,
        require: [true, 'Los apellidos son requeridos']
    },

    typeDocument:{
        type: String,
        require: [true, 'El tipo de documento es necesario']
    },

    document: {
        type: Number,
        required: [true, 'El numero de documento es requerido'],
        unique: true
    },

    expeditionDate: {
        type: String,
        required: [true, 'La fecha de expedición de tu documento de indentidad es requerido']
    },

    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },

    rol: {
        type: String,
        default: 'USER_ROLE'
    },

    state: {
        type: Boolean,
        default: true
    }
});



userSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user  } = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model( 'user', userSchema );