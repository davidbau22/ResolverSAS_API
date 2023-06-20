const { DataTypes, INTEGER } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('technician', {
    id: {
      type:DataTypes.INTEGER,
      allowNull:false,
      primaryKey:true
    },
    subsidiary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currentlyStatus: {
      type: DataTypes.STRING,
      defaultValue:'inactive',
      allowNull: true,
    },
    jobsAssigned: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue:[],
      allowNull:true,
    },
    assignedResourses: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue:[],
      allowNull:true,
    },
    visitedClients: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue:[],
      allowNull:true,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue:'technician',
      allowNull: true,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    }
  });
};
