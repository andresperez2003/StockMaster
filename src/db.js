import { Sequelize } from 'sequelize';
import { DB_DATABASE, DB_PASSWORD, DB_HOST, DB_PORT, DB_USER } from './config.js';

// Crea una instancia de Sequelize utilizando la información de configuración
export const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql', // Tipo de base de datos que estás utilizando
  logging: false // Desactiva la impresión de las consultas SQL en la consola (opcional)
});