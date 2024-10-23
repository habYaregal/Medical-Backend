import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../DbConfigs/DbConfig.js";


const User = sequelize.define('User', {

    email: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    role: {
        type: DataTypes.ENUM('Admin', 'SuperAdmin'),
        allowNull: false,
    },
    isdeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    sessionToken: {
        type: DataTypes.STRING,  
        allowNull: true,         
        defaultValue: null
    }
});

export default User;