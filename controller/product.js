const Product = require('../model/product');

const createProduct = async (req, res) => {
    const {name, price, category} = req.body;
    const {userAuthenticate: user} = req;
    let product = await Product.findOne({name});
    if (product) {
        return res.status(400).json({
            msg: `El producto ${name}, ya se encuentra registrado`
        });
    }
    product = new Product({name, category, price, user: user._id});
    await product.save();
    return res.status(201).json({
        msg: 'Producto creado con exito',
        product,
    })
}
const getAllProducts = async (req, res) => {
    const {init = 0, limit = 5} = req.query;
    const query = {state: true};
    const [total, products] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .populate('user', 'name')
            .populate('category', 'name')
            .skip(Number(init))
            .limit(Number(limit))
    ]);
    res.json({
        total, products
    })
}
const getProductById = async (req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id)
        .populate('user', 'name')
        .populate('category', 'name')
    res.json({
        product
    });
}
const updateProduct = async (req, res) => {
    const {name, price} = req.body;
    const {id} = req.params;

    let data = {};
    if (name) data.name = name;
    if (price) data.price = Number(price);
    const product = await Product.findByIdAndUpdate(id, data, {new: true});
    res.json({
        product,
    })
}
const deleteProduct = async (req, res) => {
}

module.exports = {createProduct, getAllProducts, getProductById, updateProduct, deleteProduct};
