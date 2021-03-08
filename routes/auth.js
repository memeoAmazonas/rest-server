const {Router} = require('express');
const {check} = require('express-validator');

const { login } = require('../controller/auth');
const {validateField} = require('../middlewares/validate-field');

const router = Router();

router.post('/login',[
    check('email', 'Email es requerido').isEmail(),
    check('password', 'el password es obligatorio').not().isEmpty(),
    validateField
],login);

module.exports = router;
