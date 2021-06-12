const cashboxModel = require('../models/cashbox.model');
const transactionModel = require('../models/transaction.model');

const verifyEmail = async (email = '') => {

    const user = await userModel.findOne({ email });
    if (user) {
        throw new Error(`El correo: ${email}, ya está registrado`);
    }
}

const verifyEmailLogin = async (email = '') => {
    const user = await userModel.findOne({ email });
    if (!user) {
        throw new Error(`El usuario con el correo: ${email}, no existe`);
    }
}

const verifyDocument = async (document = 0) => {
    
    const user = await userModel.findOne({document});
    if (user) {
        throw new Error(`El documento: ${document}, ya está registrado`);
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
        throw new Error(`El usuario con el id no existe ${id}`);
    }
}

const verifyTransactionId = async (id) => {
    const transaction = await transactionModel.findById(id);
    if (!transaction) {
        throw new Error(`La transacción con el id no existe ${id}`);
    }
}

const verifyCashboxId = async (id) => {
    const cashbox = await cashboxModel.findById(id);
    if (!cashbox) {
        throw new Error(`La caja con el id no existe ${id}`);
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
    verifyEmail,
    verifyEmailLogin,
    verifyDocument,
    verifyDocumentLogin,
    verifyUserId,
    verifyTransactionId,
    verifyCashboxId,
    allowedCollections
}

