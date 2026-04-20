import prisma from '../../utils/prisma';

async function main() {
  console.log('Seeding database...');
  // Add seed logic here
  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
