import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('traductor', 'root', 'admin123', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3307
});

export default sequelize