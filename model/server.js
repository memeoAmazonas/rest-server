const { dbConection } = require("../database/config");

const express = require('express');
const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/user';
        this.authPath = '/api/auth';
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
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.userPath, require('../routes/user'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.clear();
            console.log("servidor se esta ejecutando en el puerto ", this.port);
        });

    }
}

module.exports = Server;
