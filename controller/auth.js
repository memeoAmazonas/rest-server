const bcryptjs = require('bcryptjs');

const User = require('../model/user');

const {generateJWT} = require('../helpers/generate-JWT');
const {verifyGoogleToken} = require('../helpers/google-verify');

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
const googleSignIn = async (req, res) => {
    const {id_token} = req.body;
    try {
        const {email, name, img} = await verifyGoogleToken(id_token);
        let user = await User.findOne({email});
        if (!user) {
            const data = {
                email,
                name,
                password: ':)',
                img,
                google: true,
            }
            user = new User(data);
            await user.save();
        }
        if (!user.state) {
            return res.status(401).json({
                msg: 'usuario deshabilitado',
            })
        }
        //generate jwt
        const token = await generateJWT(user.id);
        res.json({
            msg: 'entro',
            user,
            token,
        })
    } catch (e) {
        res.status(400).json({
            msg: `token de google  no valido`,
        })
    }

}
module.exports = {login, googleSignIn}
