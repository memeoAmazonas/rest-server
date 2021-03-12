const {response} = require('express');
const { Category } = require('../model')

const createCategory = async (req, res = response) => {
    const { name } = req.body;
    const { userAuthenticate: user } = req;
    let category = await Category.findOne({name});

    if (category){
      return  res.status(400).json({ msg: 'ya existe la categoria', category});
    }else {
        console.log(user, user._id);
        category = new Category({ name: name.toUpperCase(), user: user._id});
        await category.save();
    }

    res.status(201).json({
        category,
        msg: 'category creado'
    })

}

const getAllCategory = async (req, res ) => {
    const {init = 0, limit = 5} = req.query;
    const query = { state: true};
    const [total, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)

            .populate('user','name')
            .skip(Number(init))
            .limit(Number(limit))
    ])
    res.json({total, categories})
}

const getCategoyById = async (req, res)=> {
    const {id} = req.params;
    const category = await Category.findById(id).populate('user', 'name');
    res.json({
        category,
    })
}
const putCategory  = async (req, res)=> {
    const { state, user, ...data} = req.body;
    const { userAuthenticate } = req;
    const { id } = req.params;
    data.name = data.name.toUpperCase();
    data.user = userAuthenticate._id;
    const category = await Category.findByIdAndUpdate(id, data, {new: true});
    res.json({
    category,
    })

}

const deleteCategory = async (req, res)=> {
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(id, { state: false}, { new: true });
    res.json({
        category,
    })

}
module.exports = {createCategory, getAllCategory, getCategoyById, putCategory, deleteCategory}
