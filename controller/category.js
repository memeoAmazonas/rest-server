const {response} = require('express');
const { Category } = require('../model')
const createCategory = async (req, res = response) => {
    const { name } = req.body;
    const { userAuthenticate: user } = req;
    let category = await Category.findOne({name});

    if (category){
      return  res.status(400).json({ msg: 'ya existe la categoria', category});
    }else {
        category = new Category({ name, user: user._id});
        await category.save();
    }

    res.status(201).json({
        category,
        msg: 'category creado'
    })

}

const getAllCategory = async (req, res ) => {
    const {init = 0, limit = 5} = req.query;

    const [total, users] = await Promise.all([
        Category.countDocuments(),
        Category.find()
            .skip(Number(init))
            .limit(Number(limit))
    ])
    res.json({total, users})
}
module.exports = {createCategory, getAllCategory}
