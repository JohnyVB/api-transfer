const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userModel = require('../models/user.model');

const { verifyJWT, generateJWT } = require('../helpers/generate-jwt');
const { sendEmail } = require('../helpers/nodemailerHandler');

const logEmail = async (user, password, res) => {
    try {

        if (!user.state) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            });
        }

        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }


        const token = await generateJWT(user.id);

        res.status(200).json({
            user,
            token
        });

    } catch (error) {
        res.status(500).json({
            msg: 'Error en logEmail()',
            error
        });
    }
}

const loginUser = async (req = request, res = response) => {

    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    await logEmail(user, password, res);

}

const loginAtm = async (req = request, res = response) => {

    const { document, password } = req.body;

    const user = await userModel.findOne({ document });

    if (user.rol !== 'USER_ROLE') {
        await logEmail(user, password, res); 
    }else{
        return res.status(400).send({
            msg: 'Usuario / Password no son correctos - rol no valido'
        });
    }

}

const getUserAdmin = async (req = request, res = response) => {
    try {
        const { token } = req.body;

        const { uid } = await verifyJWT(token);
        
        const user = await userModel.findById(uid).populate('cashBox');

        if (user.rol !== 'ADMIN_ROLE') {
            return res.status(400).send({
                msg: 'Usuario no permitido en este portal'
            });
        }

        res.status(200).send({
            user
        });

    } catch (error) {
        return res.status(500).send({
            msg: 'Error en getUserAdmin()',
            error
        });
    }
}

const resetpass = async (req = request, res = response) => {
    try {
        const { email } = req.body;
        const token = await generateJWT(email);
        await sendEmail(email, token);

        res.status(200).send({
            msg: 'Correo enviado....'
        });
    } catch (error) {
        return res.status(500).send({
            msg: 'Error en emailVerify()',
            error
        });
    }
}

const updatepass = async (req = request, res = response) => {
   
    try {
        const { token, password } = req.body;

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const salts = bcryptjs.genSaltSync();

        const updatepass = bcryptjs.hashSync(password, salts)

        const user = await userModel.findOneAndUpdate({email: uid}, {password: updatepass}, { new: true });

        res.status(200).send({
            user
        });

    } catch (error) {
        return res.status(500).send({
            msg: 'Error en updatepass()',
            error
        });
    }
}

const activateUser = async (req = request, res = response) => {

    try {
        const { token } = req.body;

        const { uid } = await jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const user = await userModel.findOneAndUpdate({ _id: uid }, { state: true }, { new: true });

        res.status(200).send({
            user
        });
    } catch (error) {
        return res.status(500).send({
            msg: 'Error en activateUser()',
            error
        });
    }
}  

module.exports = {
    loginUser,
    loginAtm,
    getUserAdmin,
    resetpass,
    updatepass,
    activateUser
}
