
const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields, validateJWT, haveRole } = require('../middlewares');

const { validRole, verifyEmail, verifyUserId } = require('../helpers/db-validators');

const { usersGet, usersPost, userPut, userPatch } = require('../controllers/user.controller');

const router = Router();

router.get('/', usersGet );

router.post('/',[
    check('firstName', 'Los nombres son requeridos').not().isEmpty(),
    check('lastName', 'Los apellidos son requeridos').not().isEmpty(),
    check('typeDocument', 'El tipo de documento es requerido').not().isEmpty(),
    check('document', 'El numero de documento es requerido').not().isEmpty(),
    check('document', 'El documento debe ser numerico').isNumeric(),
    check('expeditionDate', 'La fecha de expedición de tu documento de indentidad es requerido').not().isEmpty(),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom( verifyEmail ),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }), 
    validateFields
], usersPost );

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( verifyUserId ),
    check('rol').custom( validRole ), 
    validateFields
],userPut );

router.patch('/:id',[
    validateJWT,
    haveRole('ADMIN_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( verifyUserId ),
    validateFields
],userPatch );

module.exports = router;