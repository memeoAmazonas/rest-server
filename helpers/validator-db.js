const Category = require('../model/category');
const Role = require('../model/rol');
const User = require('../model/user');
const Product = require('../model/product');

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
const categoryByIdValidateNoExist = async (id) => {
    const exist = await Category.findById(id);
    if (!exist) throw new Error('No existe categoria con ese id');
}
const productByIdNoExist = async (id) => {
    const exist = await Product.findById(id);
    if (!exist) throw new Error('No existe producto con ese id');
}
module.exports = {
    rolValidate,
    emailValidateExist,
    userByIdValidateNotExist,
    categoryByIdValidateNoExist,
    productByIdNoExist
}
