// Importa Sequelize y la instancia de conexión a la base de datos
import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js'; // Asegúrate de que 'sequelize' sea la instancia de conexión a tu base de datos

// Define el modelo de la tabla Bill
const Bill = sequelize.define('Bill', {
  date_bill: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status:{
    type: DataTypes.STRING,
    allowNull: false
  },
  id_user:{
    type: DataTypes.STRING,
    allowNull: false
  },
  id_client:{
    type: DataTypes.STRING,
    allowNull: false
  },
  status:{
    type: DataTypes.STRING,
    allowNull: false
  },
  id_company: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'bill', // Nombre de la tabla en la base de datos
  timestamps: false // Desactiva la gestión automática de marcas de tiempo
});

// Exporta el modelo Bill
export { Bill };