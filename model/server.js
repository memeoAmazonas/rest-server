const { dbConection } = require("../database/config");

const express = require('express');
const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            authPath:     '/api/auth',
            categoryPath: '/api/category',
            productPath:  '/api/product',
            userPath:     '/api/user'
        }
        this.connectDB();
        this.middlewares();
        this.routes();
    }

    async connectDB() {
        await dbConection();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.paths.authPath, require('../routes/auth'));
        this.app.use(this.paths.categoryPath, require('../routes/category'));
        this.app.use(this.paths.userPath, require('../routes/user'));
        this.app.use(this.paths.productPath, require('../routes/product'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.clear();
            console.log("servidor se esta ejecutando en el puerto ", this.port);
        });

    }
}

module.exports = Server;
