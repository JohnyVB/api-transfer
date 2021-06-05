const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { loginUser, loginAtm } = require('../controllers/auth.controller');
const { verifyEmailLogin, verifyDocumentLogin } = require('../helpers/db-validators');

const router = Router();

router.post('/loginuser',[
    check('email', 'El correo es requerido').isEmail(),
    check('email').custom(verifyEmailLogin),
    check('password', 'La contraseña es requerida').not().isEmpty(),
    validateFields
],loginUser);

router.post('/loginatm',[
    check('document', 'El numero de documento es requerido').not().isEmpty(),
    check('document').custom(verifyDocumentLogin),
    check('password', 'La contraseña es requerida').not().isEmpty(),
    validateFields
],loginAtm);

module.exports = router; 