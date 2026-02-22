import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/tasks.routes.js';
import { FRONTEND_URL } from './config.js';

const app = express();

// Configuramos cors para comunicar el backend con nuestro frontend
app.use(cors({
    origin: FRONTEND_URL,
    credentials: true
}));

app.use(morgan('dev'));

// Middleware que parsea el req.body a un objeto JSON
app.use(express.json());

// Middleware para parsear cookies
app.use(cookieParser());

// Middleware que conecta las rutas definidas
app.use('/api', authRoutes);
app.use('/api', taskRoutes);
app.get('/', (req, res) => {
  res.send('API funcionando');
});


export default app;