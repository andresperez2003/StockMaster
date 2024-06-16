// Importa Sequelize y la instancia de conexión a la base de datos
import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js'; // Asegúrate de que 'sequelize' sea la instancia de conexión a tu base de datos

import {Product} from './product.model.js'
import {Part} from './part.model.js'
import { Company } from './company.model.js';



// Define el modelo de la tabla PartXProduct
const ProductXPart = sequelize.define('PartXProduct', {
  id_product: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_part: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_company:{
    type: DataTypes.STRING,
    allowNull:false
  }
}, {
  tableName: 'productxpart', // Nombre de la tabla en la base de datos
  timestamps: false // Desactiva la gestión automática de marcas de tiempo
});

ProductXPart.belongsTo(Product, { foreignKey: 'id_product' });
ProductXPart.belongsTo(Part, { foreignKey: 'id_part' });
ProductXPart.belongsTo(Company, { foreignKey: 'id_company' });


// Exporta el modelo PartXProduct
export { ProductXPart };