const {Router} = require('express');
const {check} = require('express-validator');
const {validateField} = require('../middlewares/validate-field');
const {getUser, putUser, postUser, deleteUser} = require('../controller/user');
const Role = require('../model/rol');
const router = Router();

router.get('/', getUser);
router.put('/:id', putUser);
router.post('/', [
    check('name', 'el nombre es requerido').not().isEmpty(),
    check('password', 'el password es requerido y mayor a 8 caracteres').isLength({min: 8}),
    check('email', 'Correo no es valido').isEmail(),
    check('role').custom(async (rol = "") => {
        const existRole = await Role.findOne({rol});
        if (!existRole) throw new Error(`El rol: ${rol} no existe`);
    }),
    //check('role','No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validateField,
], postUser);
router.delete('/', deleteUser);

module.exports = router;
