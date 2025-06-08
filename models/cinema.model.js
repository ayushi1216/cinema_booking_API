
module.exports = (sequelize, DataTypes) => {

    return sequelize.define('Cinema', {

        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        totalSeats: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cinemaName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }

    });

};