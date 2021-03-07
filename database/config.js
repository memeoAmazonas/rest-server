const mongoose = require('mongoose');

const dbConection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_ATLAS, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log("Base de datos online");
    } catch (e) {
        throw new Error('Error conectando la Base de datos', e);
    }
}

module.exports = {dbConection};
