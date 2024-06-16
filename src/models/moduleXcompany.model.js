// Importa Sequelize y la instancia de conexión a la base de datos
import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js'; // Asegúrate de que 'sequelize' sea la instancia de conexión a tu base de datos
import { Module } from './module.model.js';
import {Company} from './company.model.js'

// Define el modelo de la tabla ProductXSupplier
const ModuleXCompany = sequelize.define('ModuleXCompany', {
  id_module: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_company: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'modulexcompany', // Nombre de la tabla en la base de datos
  timestamps: false // Desactiva la gestión automática de marcas de tiempo
});

ModuleXCompany.belongsTo(Module, { foreignKey: 'id_module' });
ModuleXCompany.belongsTo(Company, { foreignKey: 'id_company' });


// Exporta el modelo ProductXSupplier
export { ModuleXCompany };