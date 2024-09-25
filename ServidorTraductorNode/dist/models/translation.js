"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Translation = connection_1.default.define('translation', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    shuar: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    espanol: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
});
exports.default = Translation;
