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
                unique: true,
                validate: {
                    len:{ 
                            args: [5,20],
                            msg: "Username must be at least 5 characters long."
                        }  
                }
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                validate: {
                    isEmail: {
                        msg: "Not a valid email."
                    }
                },
                allowNull:false
            }
        },
        {
            createdAt: false,
            updatedAt: false
        }
    )
    return User;
}