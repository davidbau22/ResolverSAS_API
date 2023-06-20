const { DataTypes } = require('sequelize');

module.exports = (sequelize)=> {

    sequelize.define('sucursal',{
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        subsidiaryType: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
            primaryKey:true
        },
    })
}