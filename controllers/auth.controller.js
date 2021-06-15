const { response } = require('express');
const bcryptjs = require('bcryptjs')

const userModel = require('../models/user.model');

const { generateJWT } = require('../helpers/generate-jwt');

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



const loginUser = async (req, res = response) => {

    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    await logEmail(user, password, res);

}

const loginAtm = async (req, res = response) => {

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

module.exports = {
    loginUser,
    loginAtm
}
