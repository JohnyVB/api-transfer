const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const userModel = require('../models/user.model');

//Traer todos los usuarios
const usersGet = async (req = request, res = response) => {

    try {
        const { end = 10, start = 0 } = req.query;
        const query = { state: true };

        const [amount, users] = await Promise.all([
            userModel.countDocuments(query),
            userModel.find(query)
                .skip(Number(start))
                .limit(Number(end))
        ]);

        res.status(200).json({
            amount,
            users
        });
    } catch (error) {
        return res.status(500).send({
            msg: 'Error en userGet()',
            error
        });
    }
}

//Crear usuario
const usersPost = async (req, res = response) => {

    try {
        const { firstName, lastName, typeDocument, document, expeditionDate, email, password } = req.body;
        const user = new userModel({firstName, lastName, typeDocument, document, expeditionDate, email, password});

        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);

        // Guardar en BD
        await user.save();

        res.status(200).json({
            user
        });
    } catch (error) {
        return res.status(500).send({
            msg: 'Error en usersPost()',
            error
        });
    }
}

//Actualizar usuario
const userPut = async (req, res = response) => {

    try {
        const { id } = req.params;
        const { _id, password, email, ...userAll } = req.body;

        if (password) {
            // Encriptar la contraseña
            const salt = bcryptjs.genSaltSync();
            userAll.password = bcryptjs.hashSync(password, salt);
        }

        const user = await userModel.findByIdAndUpdate(id, userAll);

        res.status(200).json(user);
    } catch (error) {
        return res.status(500).send({
            msg: 'Error en userPut()',
            error
        });
    }
}

//Deshabilitar usuario
const userPatch = (req, res = response) => {
    
    try {
        res.status(200).json({
            msg: 'patch API - usuariosPatch'
        });
    } catch (error) {
        return res.status(500).send({
            msg: 'Error en userPatch()',
            error
        });
    }
}




module.exports = {
    usersGet,
    usersPost,
    userPut,
    userPatch,
}