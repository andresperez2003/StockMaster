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
import productoXProductRoute from './routes/productxproduct.route.js';
import productoXSupplierRoute from './routes/productxsupplier.route.js';
import clientRoutes from './routes/client.route.js';
import billRoutes from './routes/bill.route.js';
import saleRoutes from './routes/sale.route.js';
import campusRouter from './routes/campus.route.js';
import statusBillRouter from './routes/statusBill.route.js';
import operationRouter from './routes/operation.route.js';
import moduleRouter from './routes/module.route.js';
import permissRouter from './routes/permiss.route.js';
import userXpermissRouter from './routes/userXpermiss.route.js';
import rolXpermissRouter from './routes/rolXpermiss.route.js';
import productXcampusRouter from './routes/productXcampus.route.js';
import supplierXcampusRouter from './routes/supplierXcampus.route.js';
import moduleXCompany from './routes/moduleXcompany.route.js';
import unitRoute from './routes/unit.route.js';

























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
app.use('/api/v1', productoXProductRoute);
app.use('/api/v1', productoXSupplierRoute);
app.use('/api/v1', clientRoutes);
app.use('/api/v1', billRoutes);
app.use('/api/v1', saleRoutes);
app.use('/api/v1', campusRouter);
app.use('/api/v1', statusBillRouter);
app.use('/api/v1', operationRouter);
app.use('/api/v1', moduleRouter);
app.use('/api/v1', permissRouter);
app.use('/api/v1', rolXpermissRouter);
app.use('/api/v1', userXpermissRouter);
app.use('/api/v1', productXcampusRouter);
app.use('/api/v1', supplierXcampusRouter);
app.use('/api/v1', moduleXCompany);
app.use('/api/v1', unitRoute);


























// Middleware para manejar rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({
    message: 'Endpoint not found',
  });
});

export default app;
