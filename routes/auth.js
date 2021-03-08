const {Router} = require('express');
const {check} = require('express-validator');

const {validateField} = require('../middlewares/validate-field');
const { login, googleSignIn } = require('../controller/auth');

const router = Router();

router.post('/login',[
    check('email', 'Email es requerido').isEmail(),
    check('password', 'el password es obligatorio').not().isEmpty(),
    validateField
],login);

router.post('/google', [
    check('id_token', 'id_token is required').not().isEmpty(),
    validateField,
], googleSignIn)

module.exports = router;
