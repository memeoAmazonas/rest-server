const {response} = require('express');

const validateNamePriceProduct = (req, res = response, next) => {
    const {price, name} = req.body;
    if (!name && !price) {
        res.status(400).json({
            msg: 'Debe incluir al menos el nombre o el price en la peticion'
        })
    }
    try {
        if (price && typeof price === "string") {
            const number = Number.parseFloat(price);
            Number.isNaN(price);
        }
    } catch (e) {
        console.error("error ", e.message);
        res.status(400).json({
            msg: "Error el precio debe ser un numero mayor a 0"
        })
    }

    next();
}
module.exports = {validateNamePriceProduct};
