const {Router} = require('express');
const {check} = require('express-validator');
const {createProduct, getAllProducts, getProductById, updateProduct, deleteProduct} = require('../controller/product');
const {validateRole, isRoleAdmin, validateField, validateJWT} = require('../middlewares');
const {categoryByIdValidateNoExist, productByIdNoExist} = require('../helpers/validator-db');
const { validateNamePriceProduct } = require('../middlewares/validate-name-price-product');
const router = Router();

router.post('/', [
    validateJWT,
    check('name', 'el nombre es requerido').not().isEmpty(),
    check("price", "El precio es requerido").not().isEmpty(),
    check("price", "El precio debe ser un numero").isNumeric(),
    check("price", `El precio debe ser mayor a 0.001${process.env.CURRENCY}`).isFloat({min: 0.001}),
    check("category").custom(categoryByIdValidateNoExist),
    validateField,
], createProduct);

router.get('/', getAllProducts);

router.get('/:id', [
    check('id', 'No es un id Valido').isMongoId(),
    check('id').custom(productByIdNoExist),
    validateField
], getProductById);
router.put('/:id', [
    validateJWT,
    check('id', 'No es un id Valido').isMongoId(),
    check('id').custom(productByIdNoExist),
    validateNamePriceProduct,
    validateField,
], updateProduct)

module.exports = router;
