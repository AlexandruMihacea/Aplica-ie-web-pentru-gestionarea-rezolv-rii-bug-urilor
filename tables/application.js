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
                unique: true,
                allowNull: false,
                validate: {
                    len: {
                        args: [2, 30],
                        msg: 'The name must contain between 2 and 30 characters.'
                    }
                }
            },
            id_admin: {
                type:DataTypes.INTEGER,
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