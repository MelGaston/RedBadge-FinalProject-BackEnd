module.exports = function (sequelize, DataTypes) {
    return sequelize.define('comment', {
        user_id: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false
        },
        typeOf: {
            type: DataTypes.STRING,
            allowNull: false
        },
        votes: {
            type: DataTypes.NUMBER
        }
    });
};