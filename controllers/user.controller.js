const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const userModel = require('../models/user.model');
const { generateJWT } = require('../helpers/generate-jwt');
const { sendUid } = require('../helpers/nodemailerHandler');

const userGet = async (req = request, res = response) => {
    
    try {
        const { id } = req.query;;

        const user = await userModel.findById(id);

        res.status(200).json({
            user
        });
    } catch (error) {
        return res.status(500).send({
            msg: 'Error en userGet()',
            error
        });
    }
}

const userPost = async (req = request, res = response) => {

    try {
        const { ...userAll } = req.body;
        const user = new userModel(userAll);

        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(userAll.password, salt);

        await user.save();
        
        const token = await generateJWT(user._id);

        await sendUid(user.email, token);

        res.status(200).json({
            user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            msg: 'Error en userPost()',
            error
        });
    }
}

const userPut = async (req = request, res = response) => {

    try {
        const { id } = req.params;
        const { _id, password, email, document, ...userAll } = req.body;

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

const userCashier = async(req = request, res = response) => {

    try {
        const { id } = req.query;
        const { cashboxId } = req.body;

        var update = {
            rol: 'CASHIER_ROLE',
            $push: {
                cashBox: cashboxId
            }
        }

        const user = await userModel.findOneAndUpdate({ _id: id}, update, { new: true});

        res.status(200).send({
            user
        });

    } catch (error) {
        return res.status(500).send({
            msg: 'Error en userCashier()',
            error
        });
    }
}

const userPatch = async (req = request, res = response) => {
    
    try {

        const { id } = req.query;
        const {...userAll } = req.body;

        const user = await userModel.findOneAndUpdate({ _id: id }, userAll);

        res.status(200).json({
            user
        });
    } catch (error) {
        return res.status(500).send({
            msg: 'Error en userPatch()',
            error
        });
    }
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userCashier,
    userPatch,
}