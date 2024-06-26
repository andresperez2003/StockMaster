// Importa Sequelize y la instancia de conexión a la base de datos
import { DataTypes } from 'sequelize';
import {Product} from "../models/product.model.js" 
import { sequelize } from '../db.js'; // Asegúrate de que 'sequelize' sea la instancia de conexión a tu base de datos
import { Bill } from './bill.model.js';
import { Client } from './client.model.js';
import { Campus } from './campus.model.js';

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
  id_campus: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_client: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date_sale: {
    type: DataTypes.DATE,
    allowNull: false
  },
}, {
  tableName: 'sale', // Nombre de la tabla en la base de datos
  timestamps: false // Desactiva la gestión automática de marcas de tiempo
});

Sale.belongsTo(Product, { foreignKey: 'id_product' });
Sale.belongsTo(Bill, { foreignKey: 'id_bill' });
Sale.belongsTo(Client, { foreignKey: 'id_client' });
Sale.belongsTo(Campus, { foreignKey: 'id_campus' });




// Exporta el modelo Category
export { Sale };