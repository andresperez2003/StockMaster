// Importa Sequelize y la instancia de conexión a la base de datos
import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js'; // Asegúrate de que 'sequelize' sea la instancia de conexión a tu base de datos

// Define el modelo de la tabla Company
const Company = sequelize.define('Company', {
  nit: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  photo:{
    type: DataTypes.STRING,
    allowNull: false
  },
  address:{
    type: DataTypes.STRING,
    allowNull: false
  },
  phone:{
    type: DataTypes.STRING,
    allowNull: false
  },
  status:{
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  id_city:{
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'company', // Nombre de la tabla en la base de datos
  timestamps: false // Desactiva la gestión automática de marcas de tiempo
});

// Exporta el modelo Company
export { Company };