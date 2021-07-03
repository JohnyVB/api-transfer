const jwt = require('jsonwebtoken');

const generateJWT = ( uid = '' ) => {

    return new Promise( (resolve, reject) => {

        const payload = { uid };

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, ( err, token ) => {

            if ( err ) {
                console.log(err);
                reject( 'No se pudo generar el token' )
            } else {
                resolve( token );
            }
        });
    })
}

const verifyJWT = (token = '') => {
    
    return new Promise((resolve, reject) => {

        jwt.verify(token, process.env.SECRETORPRIVATEKEY, (err, decode) => {
            if (err) {
                console.log(err);
                reject('Error al verificar el token');
            }else{
                resolve(decode);
            }
        });
    });
}

module.exports = {
    generateJWT,
    verifyJWT
}

