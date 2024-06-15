// Importa Sequelize y la instancia de conexión a la base de datos
import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js'; // Asegúrate de que 'sequelize' sea la instancia de conexión a tu base de datos
import { Rol } from './rol.model.js';
import {Permiss} from './permiss.model.js'

// Define el modelo de la tabla ProductXSupplier
const RolXPermiss = sequelize.define('RolXPermiss', {
  id_rol: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_permiss: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'rolxpermiss', // Nombre de la tabla en la base de datos
  timestamps: false // Desactiva la gestión automática de marcas de tiempo
});

RolXPermiss.belongsTo(Permiss, { foreignKey: 'id_permiss' });
RolXPermiss.belongsTo(Rol, { foreignKey: 'id_rol' });


// Exporta el modelo ProductXSupplier
export { RolXPermiss };