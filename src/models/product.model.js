// Importa Sequelize y la instancia de conexión a la base de datos
import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js'; // Asegúrate de que 'sequelize' sea la instancia de conexión a tu base de datos
import {Category} from "../models/category.model.js"
import { Unit } from './unit.model.js';
import { Company } from './company.model.js';

// Define el modelo de la tabla Product
const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price_sale: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
   price_unit: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  discount: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  id_category: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_company: {
    type: DataTypes.STRING,
    allowNull: false
  },
  id_unit: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  can_sell: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
}, {
  tableName: 'product', // Nombre de la tabla en la base de datos
  timestamps: false // Desactiva la gestión automática de marcas de tiempo
});

Product.belongsTo(Category, { foreignKey: 'id_category' });
Product.belongsTo(Unit, { foreignKey: 'id_unit' });
Product.belongsTo(Company, { foreignKey: 'id_company' });




// Exporta el modelo Product
export { Product };