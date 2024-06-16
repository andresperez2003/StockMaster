// Importa Sequelize y la instancia de conexión a la base de datos
import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js'; // Asegúrate de que 'sequelize' sea la instancia de conexión a tu base de datos
import { User } from './user.model.js';
import {Permiss} from './permiss.model.js'
import { Company } from './company.model.js';

// Define el modelo de la tabla ProductXSupplier
const UserXPermiss = sequelize.define('UserXPermiss', {
  id_user: {
    type: DataTypes.STRING,
    allowNull: false
  },
  id_permiss: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_company:{
    type: DataTypes.STRING,
    allowNull:false
  }
}, {
  tableName: 'userxpermiss', // Nombre de la tabla en la base de datos
  timestamps: false // Desactiva la gestión automática de marcas de tiempo
});

UserXPermiss.belongsTo(Permiss, { foreignKey: 'id_permiss' });
UserXPermiss.belongsTo(User, { foreignKey: 'id_user' });
UserXPermiss.belongsTo(Company, { foreignKey: 'id_company' });



// Exporta el modelo ProductXSupplier
export { UserXPermiss };