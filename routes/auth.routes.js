const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { loginUser, loginAtm, resetpass, updatepass, activateUser } = require('../controllers/auth.controller');
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

router.post('/resetpass', [
    check('email', 'El correo es requerido').isEmail(),
    check('email').custom(verifyEmailLogin),
    validateFields
], resetpass);

router.put('/updatepass', [
    check('token', 'El token es requerido').not().isEmpty(),
    check('password', 'La nueva password es requerida').not().isEmpty(),
    validateFields
], updatepass);

router.post('/activation', [
    check('token', 'El token es requerido').not().isEmpty(),
    validateFields
], activateUser);

module.exports = router; 