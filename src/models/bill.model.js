// Importa Sequelize y la instancia de conexión a la base de datos
import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js'; // Asegúrate de que 'sequelize' sea la instancia de conexión a tu base de datos
import { User } from './user.model.js';
import { Client } from './client.model.js';
import { statusBill } from './statusBill.model.js';
import { Campus } from './campus.model.js';

// Define el modelo de la tabla Bill
const Bill = sequelize.define('Bill', {
  id:{
    type: DataTypes.STRING, 
    primaryKey:true
  },
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
  id_campus: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'bill', // Nombre de la tabla en la base de datos
  timestamps: false // Desactiva la gestión automática de marcas de tiempo
});

Bill.belongsTo(User, { foreignKey: 'id_user' });
Bill.belongsTo(Client, { foreignKey: 'id_client' });
Bill.belongsTo(statusBill, { foreignKey: 'status' });
Bill.belongsTo(Campus, { foreignKey: 'id_campus' });

// Exporta el modelo Bill
export { Bill };