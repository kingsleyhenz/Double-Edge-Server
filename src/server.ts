import { createServer } from 'http';
import app from './app';
import { config } from './config/config';
import { setupSocket } from './config/socket';
import { setupCronJobs } from './config/cron';

const PORT = config.port;

const startServer = () => {
  const httpServer = createServer(app);

  // Initialize WebSockets
  setupSocket(httpServer);

  // Initialize Cron Jobs
  setupCronJobs();

  httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
