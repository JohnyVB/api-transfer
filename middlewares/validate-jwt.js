const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const userModel = require('../models/user.model');

const validateJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        const user = await userModel.findById( uid );

        if( !user ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe DB'
            })
        }

        if ( !user.state ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado: false'
            })
        }
        
        req.user = user;
        next();

    } catch (error) {
        res.status(401).json({
            msg: 'Token no válido'
        });
    }

}




module.exports = {
    validateJWT
}