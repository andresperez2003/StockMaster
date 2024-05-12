// Importa Sequelize y la instancia de conexión a la base de datos
import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js'; // Asegúrate de que 'sequelize' sea la instancia de conexión a tu base de datos

// Define el modelo de la tabla Category
const Sale = sequelize.define('Sale', {
  id_product: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_bill: {
    type: DataTypes.STRING,
    allowNull: false
  },
  id_company: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'sale', // Nombre de la tabla en la base de datos
  timestamps: false // Desactiva la gestión automática de marcas de tiempo
});

// Exporta el modelo Category
export { Sale };