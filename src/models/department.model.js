// Importa Sequelize y la instancia de conexión a la base de datos
import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js'; // Asegúrate de que 'sequelize' sea la instancia de conexión a tu base de datos

// Define el modelo de la tabla Department
const Department = sequelize.define('Department', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  id_country: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'department', // Nombre de la tabla en la base de datos
  timestamps: false // Desactiva la gestión automática de marcas de tiempo
});

// Exporta el modelo Department
export { Department };