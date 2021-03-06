module.exports = function (sequelize, DataTypes) {

    return sequelize.define('user', {
        username: {
        type:    DataTypes.STRING,
        allowNull: false,
        unique: true
        },
        firstName: {
        type:    DataTypes.STRING,
        allowNull: false
        },
        lastName: {
        type:    DataTypes.STRING,
        allowNull: false
        },
        passwordhash: {
        type:    DataTypes.STRING,
        allowNull: false
        },
        email: {
        type:    DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true },
        },
        adminStatus: DataTypes.BOOLEAN
    })
}