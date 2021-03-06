const {response} = require('express');
const getUser = (req, res = response) => {
    const {id, name="no name", otro = "no description"} = req.query;
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
const postUser = (req, res = response) => {
    res.json({
        msg: "desde el controlador user post",
        body: req.body,
    })
}
const deleteUser = (req, res = response) => {
    res.json({
        msg: "desde el controlador user delete"
    })
}

module.exports = {getUser, postUser, putUser, deleteUser};
