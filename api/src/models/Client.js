const { DataTypes } = require('sequelize');

module.exports = (sequelize)=> {

    sequelize.define('client',{
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        subsidiary: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:false
        },
        job: {
            type: DataTypes.STRING,
            allowNull:true,
        },
    })
}