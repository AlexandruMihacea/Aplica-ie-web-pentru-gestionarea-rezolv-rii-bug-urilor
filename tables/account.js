const { DataTypes } = require("sequelize/dist");
const sequelize = require("../database");
const user = require("./user");

module.exports = (sequelize, DataTypes) => {
    const Account = sequelize.define(
        'Account',
        {
            id_user: {
                type: DataTypes.INTEGER,
                unique: true //most likely e unique din fk si cum e facut post-ul.
            },
            password: {
                type: DataTypes.STRING,
                validate: {
                    min: {
                        args: [9], //always pass them as array when you use args
                        msg: "The password should have at least 8 characters."
                    }
                }
            }
        },
        {
            createdAt: false,
            updatedAt: false
        }
    )
    return Account
}