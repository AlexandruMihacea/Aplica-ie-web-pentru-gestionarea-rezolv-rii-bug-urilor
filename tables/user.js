const { DataTypes } = require("sequelize/dist");
const sequelize = require("../database");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User", 
        {
            id:{
                type: DataTypes.INTEGER,
                primaryKey:true,
                autoIncrement:true
            },
            username: {
                type: DataTypes.STRING,
                allowNull:false,
                unique: true
            },
            email: {
                type: DataTypes.STRING,
                validate: {
                    isEmail: true
                },
                allowNull:false,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
        },
        {
            createdAt: false,
            updatedAt: false
        }
    )
    return User;
}