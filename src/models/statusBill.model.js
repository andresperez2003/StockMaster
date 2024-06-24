// Importa Sequelize y la instancia de conexión a la base de datos
import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js'; // Asegúrate de que 'sequelize' sea la instancia de conexión a tu base de datos
import { Company } from './company.model.js';

// Define el modelo de la tabla Bill
const statusBill = sequelize.define('statusBill', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  id_company:{
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'statusBill', // Nombre de la tabla en la base de datos
  timestamps: false // Desactiva la gestión automática de marcas de tiempo
});

statusBill.belongsTo(Company, { foreignKey: 'id_company' });

// Exporta el modelo Bill
export { statusBill };