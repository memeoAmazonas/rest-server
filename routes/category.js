const {Router} = require('express');
const {check} = require('express-validator');
const {createCategory, getAllCategory, getCategoyById, putCategory, deleteCategory} = require('../controller/category');
const {validateRole, isRoleAdmin, validateField, validateJWT} = require('../middlewares');
const {categoryByIdValidateNoExist} = require('../helpers/validator-db');
const router = Router();

router.post('/', [
    validateJWT,
    check('name', 'el nombre es requerido').not().isEmpty(),
    validateField
], createCategory);

router.get('/', getAllCategory);

router.get('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(categoryByIdValidateNoExist),
    validateField,
], getCategoyById);

router.put('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('name', 'nombre es requerido').not().isEmpty(),
    validateJWT,
    check('id').custom(categoryByIdValidateNoExist),
    validateField
], putCategory)

router.delete('/:id', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    isRoleAdmin,
    check('id').custom(categoryByIdValidateNoExist),
    validateField
], deleteCategory)

module.exports = router;
