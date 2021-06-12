const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');
const { createCashboxTest } = require('../helpers/initial-setup');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        this.path = {
            auth: '/api/auth',
            users: '/api/users',
            search: '/api/search',
            transaction: '/api/transactions',
            cashbox: '/api/cashbox'

        }

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        this.initialSetup();
    }

    async conectarDB() {
        await dbConnection();
    }


    middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio Público
        this.app.use(express.static('public'));
    }

    routes() {

        this.app.use(this.path.auth, require('../routes/auth.routes'));
        this.app.use(this.path.users, require('../routes/user.routes'));
        this.app.use(this.path.search, require('../routes/search.routes'));
        this.app.use(this.path.transaction, require('../routes/transaction.routes'));
        this.app.use(this.path.cashbox, require('../routes/cashbox.routes'));
    }

    async initialSetup(){
        await createCashboxTest();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}

module.exports = Server;
