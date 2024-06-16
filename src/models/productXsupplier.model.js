// Importa Sequelize y la instancia de conexión a la base de datos
import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js'; // Asegúrate de que 'sequelize' sea la instancia de conexión a tu base de datos
import { Product } from './product.model.js';
import {Supplier} from './supplier.model.js'
import { Company } from './company.model.js';

// Define el modelo de la tabla ProductXSupplier
const ProductXSupplier = sequelize.define('ProductXSupplier', {
  id_product: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_supplier: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_company:{
    type: DataTypes.STRING,
    allowNull:false
  }
}, {
  tableName: 'productXsupplier', // Nombre de la tabla en la base de datos
  timestamps: false // Desactiva la gestión automática de marcas de tiempo
});

ProductXSupplier.belongsTo(Product, { foreignKey: 'id_product' });
ProductXSupplier.belongsTo(Supplier, { foreignKey: 'id_supplier' });
ProductXSupplier.belongsTo(Company, { foreignKey: 'id_company' });


// Exporta el modelo ProductXSupplier
export { ProductXSupplier };