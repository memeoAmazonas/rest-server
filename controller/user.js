const {response} = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../model/user');

const getUser = async (req, res = response) => {
    const {init = 0, limit = 5} = req.query;

    const query = {state: true};
    // funciona, sin embargo es menos eficiente ya que como no son dependientes, se debe esperar a  que se resuelvan las
    // promesas 1 a 1, en cambio con el promise.all se ejecutan ambas en paralelo y hasta que no se resuelven ambas no retorna
    // esto es utilo siempre y cuando sean independientes
    /*const total = await User.countDocuments(query);
    const users = await User.find(query)
        .skip(Number(init))
        .limit(Number(limit))*/
    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(init))
            .limit(Number(limit))
    ])
    res.json({total, users})
}
const putUser = async (req, res = response) => {
    const id = req.params.id;
    const {_id, password, google, ...info} = req.body;
    if (password) {
        info.password = bcryptjs.hashSync(bcryptjs.genSaltSync());
    }
    const user = await User.findByIdAndUpdate(id, info);
    res.json({user})
}
const postUser = async (req, res = response) => {

    const {name, email, password, role} = req.body;
    const user = new User({name, email, password, role});
    /*
    la validacion de existencia se realiza antes de llegar al punto de abajo, se realiza con un middleware que estan
    helper/validator-db.
    */
    //encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    await user.save();

    res.status(201).json({
        msg: "usuario creado exitosamente",
        user,
    })

}

const deleteUser = async (req, res = response) => {
    const { id } =req.params;
    const { userAuthenticate } = req;
    /*
    Esta forma no es recomendable por temas de integridad
    const user = await User.findByIdAndDelete(id);
     */
    /*
    este borrado es logico, para mantener la integridad de la bd
     */
    const user = await User.findByIdAndUpdate(id, { state: false});

    res.json({
        user,
        userAuthenticate,
    })
}

module.exports = {getUser, postUser, putUser, deleteUser};
