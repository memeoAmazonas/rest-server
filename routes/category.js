const {Router} = require('express');
const {check} = require('express-validator');
const {createCategory, getAllCategory} = require('../controller/category');
const {validateRole, isRoleAdmin, validateField, validateJWT} = require('../middlewares');

const router = Router();

router.post('/', [
    validateJWT,
    check('name', 'el nombre es requerido').not().isEmpty(),
    validateField
], createCategory);

router.get('/',getAllCategory)

module.exports = router;
