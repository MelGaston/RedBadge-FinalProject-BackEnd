module.exports = function (sequelize, DataTypes) {
    return sequelize.define('card', {
        user_id: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        bevName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        temp: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        prepTime: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        servingSize: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ingredients: {
            type: DataTypes.STRING,
            allowNull: false
        },
        flavorProfile: {
            type: DataTypes.STRING,
            allowNull: false
        },
        notes: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}