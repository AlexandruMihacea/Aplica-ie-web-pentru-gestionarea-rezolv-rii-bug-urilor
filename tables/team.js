const { DataTypes } = require("sequelize/dist");
const sequelize = require("../database");

module.exports = (sequelize, DataTypes) => {
    const Team = sequelize.define(
        "Team", 
        {
            _id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoincrement: true
            },
            role: {
                type: DataTypes.STRING,
                defaultValue: "MP"
            }
        },
        {
            createdAt: false,
            updatedAt: false
        }
    )
    return Team;
}
