const dbValidators = require('./db-validators');
const generateJWT = require('./generar-jwt');
const initialSetup = require('./initial-setup');

module.exports = {
    ...dbValidators,
    ...generateJWT,
    ...initialSetup
}