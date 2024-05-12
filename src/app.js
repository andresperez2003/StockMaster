import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { fileURLToPath } from 'url';
import path from 'path';

const app = express();


import companiesRoutes from './routes/company.route.js';
import categoriesRoutes from './routes/category.route.js';
import countriesRoutes from './routes/country.route.js';
import departmentsRoutes from './routes/department.route.js';
import citiesRoutes from './routes/city.route.js';
import rolRoutes from './routes/rol.route.js';
import userRoutes from './routes/user.route.js';
import productRoutes from './routes/product.route.js';
import supplierRoutes from './routes/supplier.route.js';
import partRoutes from './routes/part.route.js';
import productoXPartRoute from './routes/productxpart.route.js';
import productoXSupplierRoute from './routes/productxsupplier.js';
import supplierXPartRoutes from './routes/supplierxpart.route.js';
import clientRoutes from './routes/client.route.js';














const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Define las opciones de Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation Stock Master',
      version: '1.0.1',
      description: 'Documentación de la API',
    },
  },
  // Añade las rutas donde están definidas las anotaciones Swagger
  apis: [path.join(__dirname, './routes/*.js')],
};

// Genera la especificación Swagger
const specs = swaggerJsdoc(options);

// Usa Swagger UI en la ruta /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


// Añade el middleware para parsear JSON
app.use(express.json());

// Trae las rutas que vas a usar


// Usa las rutas
app.use('/api/v1', companiesRoutes);
app.use('/api/v1', categoriesRoutes);
app.use('/api/v1', countriesRoutes);
app.use('/api/v1', departmentsRoutes);
app.use('/api/v1', citiesRoutes);
app.use('/api/v1', rolRoutes);
app.use('/api/v1', userRoutes);
app.use('/api/v1', supplierRoutes);
app.use('/api/v1', productRoutes);
app.use('/api/v1', partRoutes);
app.use('/api/v1', productoXPartRoute);
app.use('/api/v1', productoXSupplierRoute);
app.use('/api/v1', supplierXPartRoutes);
app.use('/api/v1', clientRoutes);
















// Middleware para manejar rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({
    message: 'Endpoint not found',
  });
});

export default app;
