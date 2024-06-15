// Importa Sequelize y la instancia de conexión a la base de datos
import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js'; // Asegúrate de que 'sequelize' sea la instancia de conexión a tu base de datos
import { Module } from './module.model.js';
import {Operation} from './operation.model.js'

// Define el modelo de la tabla ProductXSupplier
const Permiss = sequelize.define('Permiss', {
  id_module: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_operation: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'permiss', // Nombre de la tabla en la base de datos
  timestamps: false // Desactiva la gestión automática de marcas de tiempo
});

Permiss.belongsTo(Module, { foreignKey: 'id_module' });
Permiss.belongsTo(Operation, { foreignKey: 'id_operation' });


// Exporta el modelo ProductXSupplier
export { Permiss };