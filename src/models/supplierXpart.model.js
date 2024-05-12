// Importa Sequelize y la instancia de conexión a la base de datos
import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js'; // Asegúrate de que 'sequelize' sea la instancia de conexión a tu base de datos

// Define el modelo de la tabla ProductXSupplier
const SupplierXPart = sequelize.define('SupplierXPart', {
  id_supplier: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_part: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_company: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'supplierXpart', // Nombre de la tabla en la base de datos
  timestamps: false // Desactiva la gestión automática de marcas de tiempo
});

// Exporta el modelo ProductXSupplier
export { SupplierXPart };