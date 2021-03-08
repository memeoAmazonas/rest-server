const validateField = require('./validate-field');
const validateJWT = require('./validate-JWT')
const validateRoles = require('./validate-roles');

module.exports = {
    ...validateField,
    ...validateJWT,
    ...validateRoles
}
