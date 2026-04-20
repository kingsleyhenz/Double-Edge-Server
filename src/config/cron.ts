import cron from 'node-cron';

export const setupCronJobs = () => {
  // Example cron job running every day at midnight
  cron.schedule('0 0 * * *', () => {
    console.log('Running daily background tasks...');
    // Add logic here
  });

  console.log('Cron jobs initialized');
};
