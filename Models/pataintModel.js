import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../DbConfigs/DbConfig.js";

const Pataint = sequelize.define('Pataint',{
    No:{
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true,
        unique: true,

    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    MRN: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Age: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    Sex: {
        type: DataTypes.ENUM('Male', 'Female'),
        allowNull: false
    },
    ClinicalPresentation:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Diagnosis: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ImagingFinding:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Surgeon: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Asistant: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Ansthesia: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Nurse: {
        type: DataTypes.STRING,
        allowNull: false
    },
    DurationOfSurgery: {
        type: DataTypes.DATE,
        allowNull: false
    },
    DurationOfAnsthesia: {
        type: DataTypes.DATE,
        allowNull: false
    },
    OutcomeOfPatient: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Remark: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // Add foreign key to relate to User
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'Users',  
            key: 'email'
        }
    }
});



export default Pataint;