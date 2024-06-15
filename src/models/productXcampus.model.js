// Importa Sequelize y la instancia de conexión a la base de datos
import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js'; // Asegúrate de que 'sequelize' sea la instancia de conexión a tu base de datos
import { Campus } from './campus.model.js';
import {Product} from './product.model.js'

// Define el modelo de la tabla ProductXSupplier
const ProductXCampus = sequelize.define('ProductXCampus', {
  id_campus: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_product: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quantity_available: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'partxcampus', // Nombre de la tabla en la base de datos
  timestamps: false // Desactiva la gestión automática de marcas de tiempo
});

ProductXCampus.belongsTo(Product, { foreignKey: 'id_product' });
ProductXCampus.belongsTo(Campus, { foreignKey: 'id_campus' });


// Exporta el modelo ProductXSupplier
export { ProductXCampus };