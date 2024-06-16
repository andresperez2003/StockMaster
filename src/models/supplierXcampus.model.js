// Importa Sequelize y la instancia de conexión a la base de datos
import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js'; // Asegúrate de que 'sequelize' sea la instancia de conexión a tu base de datos
import { Campus } from './campus.model.js';
import {Supplier} from './supplier.model.js'

// Define el modelo de la tabla ProductXSupplier
const SupplierXCampus = sequelize.define('SupplierXCampus', {
  id_campus: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_supplier: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'supplierxcampus', // Nombre de la tabla en la base de datos
  timestamps: false // Desactiva la gestión automática de marcas de tiempo
});

SupplierXCampus.belongsTo(Supplier, { foreignKey: 'id_supplier' });
SupplierXCampus.belongsTo(Campus, { foreignKey: 'id_campus' });


// Exporta el modelo ProductXSupplier
export { SupplierXCampus };