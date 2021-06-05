const { Schema, model } = require('mongoose');

const roleSchema = Schema({
    rol: {
        type: String
    }
});


module.exports = model( 'role', roleSchema );
