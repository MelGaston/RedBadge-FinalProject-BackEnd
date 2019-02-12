const Sequelize = require('sequelize');

const sequelize = new Sequelize('HBH', "postgres", "pollywantsacracker2", {
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function() {
        console.log('Connected to HBH postgres database');
    },
    function(err) {
        console.log(err);
    }
);

module.exports = sequelize;