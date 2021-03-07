const {Router} = require('express');
const {check} = require('express-validator');
const {validateField} = require('../middlewares/validate-field');
const {getUser, putUser, postUser, deleteUser} = require('../controller/user');
const Role = require('../model/rol');
const router = Router();
const { rolValidate, emailValidateExist, userByIdValidateNotExist } = require('../helpers/validator-db');
router.get('/', getUser);
router.put('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(userByIdValidateNotExist),
    check('role').custom(rolValidate),
    validateField,
], putUser);
router.post('/', [
    check('name', 'el nombre es requerido').not().isEmpty(),
    check('password', 'el password es requerido y mayor a 8 caracteres').isLength({min: 8}),
    check('email', 'Correo no es valido').isEmail(),
    check('email').custom(emailValidateExist),
    check('role').custom(rolValidate),
    validateField,
], postUser);
router.delete('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(userByIdValidateNotExist),
    validateField,
], deleteUser);

module.exports = router;
