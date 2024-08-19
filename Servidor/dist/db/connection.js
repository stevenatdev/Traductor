"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('traductor', 'root', 'admin123', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3307
});
exports.default = sequelize;
