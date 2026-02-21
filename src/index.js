import app from './app.js';
import { connectDB } from './db.js';

connectDB();

// Escucuando el servidor
app.listen(4000, '0.0.0.0', () => {
  console.log('Server on port 4000')
});
