import { createServer } from 'http';
import app from './app';
import { config } from './config/config';
import { setupSocket } from './config/socket';
import { setupCronJobs } from './config/cron';
import prisma from './utils/prisma';

// ANSI color codes
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RESET = '\x1b[0m';

const PORT = config.port;

const startServer = async () => {
  const httpServer = createServer(app);

  // Initialize WebSockets
  setupSocket(httpServer);

  // Initialize Cron Jobs
  setupCronJobs();

  // Check database connection
  console.log(`${YELLOW}⏳ Connecting to database...${RESET}`);
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log(`${GREEN}✅ Database connected successfully!${RESET}`);
  } catch (error) {
    console.error('\x1b[31m❌ Database connection failed:\x1b[0m', error);
    process.exit(1);
  }

  httpServer.listen(PORT, () => {
    console.log(`${GREEN}🚀 Server is running on port ${PORT}${RESET}`);
  });
};

startServer();
