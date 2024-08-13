// Importa Sequelize y la instancia de conexión a la base de datos
import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js'; // Asegúrate de que 'sequelize' sea la instancia de conexión a tu base de datos
import {Rol} from "../models/rol.model.js"
import {Campus} from "../models/campus.model.js"
import { City } from './city.model.js';

// Define el modelo de la tabla User
const User = sequelize.define('User', {
  identification: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  id_rol: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_campus: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'user', // Nombre de la tabla en la base de datos
  timestamps: false // Desactiva la gestión automática de marcas de tiempo
});

User.belongsTo(Rol, { foreignKey: 'id_rol' });
User.belongsTo(Campus, { foreignKey: 'id_campus' });


// Exporta el modelo User
export { User };