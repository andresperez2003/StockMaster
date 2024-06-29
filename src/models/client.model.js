// Importa Sequelize y la instancia de conexión a la base de datos
import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js'; // Asegúrate de que 'sequelize' sea la instancia de conexión a tu base de datos
import { City } from './city.model.js';
import { Company } from './company.model.js';

// Define el modelo de la tabla Client
const Client = sequelize.define('Client', {
  identification: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address:{ 
    type: DataTypes.STRING,
    allowNull:false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  id_company: {
    type: DataTypes.STRING,
    allowNull: false
  },
  id_city: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, {
  tableName: 'client', // Nombre de la tabla en la base de datos
  timestamps: false // Desactiva la gestión automática de marcas de tiempo
});
Client.belongsTo(City, { foreignKey: 'id_city' });
Client.belongsTo(Company, { foreignKey: 'id_company' });
// Exporta el modelo Client
export { Client };