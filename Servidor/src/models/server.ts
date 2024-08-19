import express, { Application } from "express";
import Users from "./users";
import routesUser from "../routes/users";

class Server {
    private app: Application;
    private port: string;
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';
        this.middleware();
        this.routes();
        this.dbConnection();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        })
    }

    // Coneccion a base de datos
    async dbConnection() {
        try {
            await Users.sync();
        } catch (error) {
            console.log(error);
        }
    }

    // Rutas
    routes() {
        this.app.use('/api/users', routesUser);
    }

    // Middleware
    middleware() {
        // Parsear el body de las peticiones
        this.app.use(express.json());
    }
}

export default Server