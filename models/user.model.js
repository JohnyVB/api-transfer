
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
        require: [true, 'El tipo de documento es requerido']
    },

    document: {
        type: Number,
        required: [true, 'El numero de documento es requerido'],
        unique: true
    },

    dateBirth: {
        type: String,
        required: [true, 'La fecha de nacimiento es requerida']
    },

    countryBirth: {
        type: String,
        required: [true, 'Pais de nacimiento es requerido']
    },

    cityBirth: {
        type: String,
        required: [true, 'Pais de nacimiento es requerido']
    },

    expeditionDate: {
        type: String,
        required: [true, 'La fecha de expedición de tu documento de indentidad es requerido']
    },

    gender: {
        type: String,
        required: [true, 'El genero es requerido']
    },

    email: {
        type: String,
        required: [true, 'El correo es requerido'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerida'],
    },

    rol: {
        type: String,
        default: 'USER_ROLE'
    },

    cashBox:[{
        type: Schema.Types.ObjectId,
        ref: 'cashbox'
    }],

    state: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user  } = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model( 'user', userSchema );
