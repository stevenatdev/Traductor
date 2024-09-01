import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

const Translation = sequelize.define('translation', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    shuar: {
        type: DataTypes.STRING,
        allowNull: false
    },
    espanol: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export default Translation