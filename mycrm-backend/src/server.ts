import app from './app';
import dotenv from 'dotenv';
import './config/db';
import { runSeeds } from './seeds';

dotenv.config();

const PORT = process.env.PORT || 5000;

// Run seeds before starting the server
runSeeds().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});