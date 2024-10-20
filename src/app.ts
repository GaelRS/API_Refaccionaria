import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './config/swagger';

const app = express();
app.use(express.json());
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

import piezaRoutes from './routes/piezasRoutes';
import clienteRoutes from './routes/clientesRoutes';


app.use('/api', piezaRoutes);
app.use('/api', clienteRoutes);


export default app;
