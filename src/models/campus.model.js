// Importa Sequelize y la instancia de conexión a la base de datos
import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js'; // Asegúrate de que 'sequelize' sea la instancia de conexión a tu base de datos
import { City } from './city.model.js';
import { Company } from './company.model.js';

// Define el modelo de la tabla Bill
const Campus = sequelize.define('Campus', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address:{
    type: DataTypes.STRING,
    allowNull: false
  },
  phone:{
    type: DataTypes.STRING,
    allowNull: false
  },
  id_city:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status:{
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  main_campus: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },  
  id_company: {
    type: DataTypes.STRING,
    allowNull: false
  }
  
}, {
  tableName: 'campus', // Nombre de la tabla en la base de datos
  timestamps: false // Desactiva la gestión automática de marcas de tiempo
});

Campus.belongsTo(City, { foreignKey: 'id_city' });
Campus.belongsTo(Company, { foreignKey: 'id_company' });


// Exporta el modelo Bill
export { Campus };