const bcryptjs = require('bcryptjs');

const User = require('../model/user');

const { generateJWT} = require('../helpers/generate-JWT');

const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        //verificar que el email existe
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({
                msg: 'Correo no se encuentra registrado'
            });
        }
        //verificar si esta innactivo
        if (!user.state) {
            return res.status(400).json({
                msg: 'usuario innactivo'
            });
        }
        //verificar el password
        const passMatch = bcryptjs.compareSync(password, user.password);
        if (!passMatch) {
            return res.status(400).json({
                msg: 'Password invalido'
            });
        }
        //generate jwt
        const token = await generateJWT(user.id);
        res.json({
            user,
            token
        });

    } catch (e) {
        res.status(500).json({
            msg: "A ocurrido un error, intente mas tarde"
        });
    }
}

module.exports = {login}
