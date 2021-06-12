const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares');
const { transactionGet, transactionPost, transactionIn} = require('../controllers/transaction.controller');
const { verifyTransactionId } = require('../helpers/db-validators');


const router = Router();

router.get('/', [
    check('transactionId', 'El id debe ser de mongoDB').isMongoId(),
    check('transactionId').custom(verifyTransactionId),
    validateFields
], transactionGet);
router.post('/', [
    check('to', 'El destinatario es requerido').isMongoId(),
    check('from', 'El remitente es requerido').isMongoId(),
    check('value', 'El valor del envio es requerido').not().isEmpty(),
    check('deliveredOut', 'La locación del envio es requerido').isMongoId(),
    validateFields
], transactionPost);
router.put('/', [
    check('transactionId', 'El id debe ser de mongoDB').isMongoId(),
    check('transactionId').custom(verifyTransactionId),
    check('transactionIn', 'El id debe ser de mongoDB').isMongoId(),
    check('transactionIn').custom(verifyTransactionId),
    validateFields
], transactionIn);

module.exports = router;