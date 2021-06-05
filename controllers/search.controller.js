const { response, request } = require('express');
const { ObjectId } = require('mongoose').Types;

const userModel = require('../models/user.model');

const allowedColletion = [
    'users',
    'transactions'
];

//Busqueda de usuario
const searchUser = async (word = '', res = response) => {

    try {
        const mongoId = ObjectId.isValid(word);

        if (mongoId) {
            const users = await userModel.findById(word);

            return res.status(200).send({
                results: (users) ? [users] : []
            });
        }

        const regex = new RegExp(word, 'i');

        const users = await userModel.find({
            $or: [{ firstName: regex }, { lastName: regex }, { email: regex }],
            $and: [{ state: true }]
        });

        res.status(200).send({
            results: users
        });
    } catch (error) {
        return res.status(500).send({
            msg: 'Error en searchUser()',
            error
        });
    }

}

//Busqueda de transacciones
const searchTransactions = async (word = '', res = response) => {

    try {
        res.status(200).send({
            msg: 'Enviar datos de busqueda'
        });
    } catch (error) {
        return res.status(500).send({
            msg: 'Error en searchTransactions()',
            error
        });
    }
}

//Busqueda general
const search = async (req = request, res = response) => {

    try {
        const { colletion, word } = req.params;

        if (!allowedColletion.includes(colletion)) {
            return res.status(400).send({
                msg: `Las colecciones permitidas son:  ${allowedColletion}`
            });
        }

        switch (colletion.toLowerCase()) {
            case 'users':
                searchUser(word, res);
                break;

            case 'transactions':
                searchTransactions(word, res);
                break;

            /* case 'productos':
                buscarProducto(word, res);
                break; */

            default:

                res.status(401).send({
                    msg: 'Ingrese un termino valido: ' + allowedColletion
                });

                break;
        }
    } catch (error) {
        return res.status(500).send({
            msg: 'Error en search()',
            error
        });
    }
}

module.exports = {
    search
}