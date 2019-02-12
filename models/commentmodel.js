module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define('comment', {
        user_id: {
            type: DataTypes.INTEGER,
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
            type: DataTypes.INTEGER
        }
    });
    return Comments
};

// module.exports = (sequelize, DataTypes) => {
//     const Comments = sequelize.define("comment", {
//         user_id:{
//             type: DataTypes.INTEGER,
//             allowNull: false
//         }
//     })
//     return Comments
// }