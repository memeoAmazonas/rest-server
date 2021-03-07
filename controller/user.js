const {response} = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../model/user');

const getUser = (req, res = response) => {
    const {id, name = "no name", otro = "no description"} = req.query;
    res.json({
        msg: "desde el controlador user get",
        id,
        name,
        otro
    })
}
const putUser = (req, res = response) => {
    const id = req.params.id;
    res.json({
        msg: "desde el controlador user put",
        id,
    })
}
const postUser = async (req, res = response) => {

        const {name, email, password, role} = req.body;
        const user = new User({name, email, password, role});

        //verificar si existe el email
        const existEmail = await User.findOne({email});
        if (existEmail) {
            return res.status(400).json({
                msg: 'Ya existe un usuario registrado con ese email'
            });
        }

        //encrypt password
        user.password = bcryptjs.hashSync(bcryptjs.genSaltSync());

        await user.save();
        res.status(201).json({
            msg: "usuario creado exitosamente",
            email,
        })
    /*} catch (e) {
        res.status(500).json({
            msg: 'Error creando el usuario en bd'
        })
        throw new Error('Error creando el usuario', e);
    }*/
}

const deleteUser = (req, res = response) => {
    res.json({
        msg: "desde el controlador user delete"
    })
}

module.exports = {getUser, postUser, putUser, deleteUser};
