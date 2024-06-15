// Importa Sequelize y la instancia de conexión a la base de datos
import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js'; // Asegúrate de que 'sequelize' sea la instancia de conexión a tu base de datos
import { Campus } from './campus.model.js';
import {Part} from './part.model.js'

// Define el modelo de la tabla ProductXSupplier
const PartXCampus = sequelize.define('PartXCampus', {
  id_campus: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_part: {
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

PartXCampus.belongsTo(Part, { foreignKey: 'id_part' });
PartXCampus.belongsTo(Campus, { foreignKey: 'id_campus' });


// Exporta el modelo ProductXSupplier
export { PartXCampus };