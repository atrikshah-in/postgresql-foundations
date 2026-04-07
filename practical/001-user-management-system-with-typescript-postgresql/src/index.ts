import express, { Express } from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes';
import { initDb } from './config/db';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Express built-in middleware for JSON body parsing
app.use(express.json());

// Initialize Database Table (Ensures table exists before use)
initDb();

// Register the User routes under /api
app.use('/api', userRoutes);

// Basic Route
app.get('/', (req, res) => {
  res.send('Welcome to User Management System API with TypeScript & PostgreSQL');
});

// Start the server
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
