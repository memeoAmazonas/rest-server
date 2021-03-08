const {response} = require('express');

const validateRole = (...roles) => {

    return (req, res = response, next) => {
        const userAuthenticate = req.userAuthenticate;
        if (!userAuthenticate) {
            return res.status(500).json({
                msg: 'Error construyendo el token'
            })
        }
        if (!roles.includes(userAuthenticate.role)) {
            return res.status(401).json({
                msg: `Usuario rol no permitido, roles permitidos: ${roles}`
            })
        }
        next();
    }
}
const isRoleAdmin = (req, res = response, next) => {
    const userAuthenticate = req.userAuthenticate;
    if (!userAuthenticate) {
        return res.status(500).json({
            msg: 'Error construyendo el token'
        })
    }


    if (userAuthenticate.role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: 'Usuario no authorizado'
        })
    }
    next();
}
module.exports = {validateRole, isRoleAdmin};
