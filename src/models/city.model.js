// Importa Sequelize y la instancia de conexión a la base de datos
import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js'; // Asegúrate de que 'sequelize' sea la instancia de conexión a tu base de datos
import { Department } from './department.model.js';

// Define el modelo de la tabla City
const City = sequelize.define('City', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  id_department: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  postal_code: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'city', // Nombre de la tabla en la base de datos
  timestamps: false // Desactiva la gestión automática de marcas de tiempo
});


City.belongsTo(Department, { foreignKey: 'id_department' });

// Exporta el modelo City
export { City };