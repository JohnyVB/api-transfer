const roleModel = require('../models/role.model');
const userModel = require('../models/user.model');


const validRole = async (rol = '') => {

    const role = await roleModel.findOne({ rol });
    if (!role) {
        throw new Error(`El rol ${rol} no está registrado en la BD`);
    }
}

const verifyEmail = async (email = '') => {

    const user = await userModel.findOne({ email });
    if (user) {
        throw new Error(`El correo: ${email}, ya está registrado`);
    }
}

const verifyEmailLogin = async(email = '') => {
    const user = await userModel.findOne({ email });
    if (!user) {
        throw new Error(`El usuario con el correo: ${email}, no existe`);
    }
}

const verifyDocumentLogin = async(document = 0) => {

    const user = await userModel.findOne({document});
    if (!user) {
        throw new Error(`El usuario con el documento: ${document}, no existe`);
    }
}

const verifyUserId = async (id) => {

    const user = await userModel.findById(id);
    if (!user) {
        throw new Error(`El id no existe ${id}`);
    }
}

const allowedCollections = (collection = '', collections = []) => {

    const included = collections.includes(collection);
    if (!included) {
        throw new Error(`La colección ${collection} no esta permitida, ${collections}`);
    }

    return true;
}



module.exports = {
    validRole,
    verifyEmail,
    verifyEmailLogin,
    verifyDocumentLogin,
    verifyUserId,
    allowedCollections
}

