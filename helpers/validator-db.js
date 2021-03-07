const Role = require('../model/rol');
const User = require('../model/user');

const rolValidate = async (role = "") => {
    const existRole = await Role.findOne({role});
    if (!existRole) throw new Error(`El rol: ${rol} no existe`);
}
const emailValidateExist = async (email = "") => {
    const existEmail = await User.findOne({email});
    if (existEmail) throw  new Error(`El email: ${email} ya se encuentra registrado`);
}
const userByIdValidateNotExist = async (id) => {
    const exist = await User.findById(id);
    if (!exist) throw  new Error(`El usuario no se encuentra registrado`);
}

module.exports = {rolValidate, emailValidateExist, userByIdValidateNotExist}
