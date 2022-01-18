const { DataTypes } = require("sequelize/dist");
const sequelize = require("../database");
const user = require("./user");


module.exports = (sequelize, DataTypes) => {
    const Bug = sequelize.define(
        "Bug",
        {
            id_bug: {
                type: DataTypes.INTEGER,
                primaryKey:true,
                autoIncrement:true
            },
            severitate: {
                type:DataTypes.STRING
            },
            prioritate: {
                type:DataTypes.STRING
            },
            descriere: {
                type: DataTypes.STRING
            },
            link: {
                type: DataTypes.STRING,
                // validate: {
                //     // isUrl: {
                //     //     msg: "Malformed link of commit."
                //     // } 
                // }
            },
            status: {
                type: DataTypes.STRING,
                defaultValue: "Nesolutionat"
            }
        }, 
        {
            createdAt: false,
            updatedAt: false
        }
    );
    return Bug;
}
