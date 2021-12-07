const { DataTypes } = require("sequelize/dist");
const sequelize = require("../database");


module.exports = (sequelize, DataTypes) => {
    const Application = sequelize.define(
        "Application", 
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey:true,
                autoIncrement:true
            },
            name: {
                type:DataTypes.STRING,
                unique: true
            },
            id_admin: {
                type:DataTypes.INTEGER, // un id de user
                allowNull: false
            }
        }, 
        {
            createdAt: false,
            updatedAt: false
        }
    );
    return Application;
}