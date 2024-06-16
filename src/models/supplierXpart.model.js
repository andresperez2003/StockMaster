// Importa Sequelize y la instancia de conexión a la base de datos
import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js'; // Asegúrate de que 'sequelize' sea la instancia de conexión a tu base de datos
import { Supplier } from './supplier.model.js';
import { Part } from './part.model.js';
import { Company } from './company.model.js';

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
  id_company:{
    type: DataTypes.STRING,
    allowNull:false
  }
}, {
  tableName: 'supplierXpart', // Nombre de la tabla en la base de datos
  timestamps: false // Desactiva la gestión automática de marcas de tiempo
});

SupplierXPart.belongsTo(Supplier, { foreignKey: 'id_supplier' });
SupplierXPart.belongsTo(Part, { foreignKey: 'id_part' });
SupplierXPart.belongsTo(Company, { foreignKey: 'id_company' });


// Exporta el modelo ProductXSupplier
export { SupplierXPart };