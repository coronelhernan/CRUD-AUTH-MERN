import app from './app.js';
import { connectDB } from './db.js';
import { PORT } from './config.js';

connectDB();

// Escucuando el servidor
app.listen((PORT), '0.0.0.0', () => {
  console.log('Server on port 4000')
});
