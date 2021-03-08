const {response} = require('express');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const validateJWT = async (req, res = response, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({
        msg: "Debe iniciar sesion para poder continuar"
    });
    try {
        const {uid} = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);
        const userAuthenticate = await User.findById(uid);
        if (!userAuthenticate) {
            return res.status(500).json({
                msg: 'Error construyendo el token'
            })
        }
        if (!userAuthenticate.state) {
            return res.status(401).json({
                msg: "Token no valido"
            });
        }
        req.userAuthenticate = userAuthenticate;
        next();
    } catch (e) {
        console.error(e);
        res.status(401).json({
            msg: "Token no valido"
        });
    }

}
module.exports = {validateJWT};
