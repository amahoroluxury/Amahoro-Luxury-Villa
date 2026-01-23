const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // 1. Create default settings
  await prisma.settings.upsert({
    where: { id: 'site-settings' },
    update: {},
    create: {
      id: 'site-settings',
      nightlyRate: 500,
      depositPercent: 50,
    },
  });
  console.log('✅ Default settings created');

  // 2. Create admin user
  await prisma.admin.upsert({
    where: { email: 'admin@amahoroluxury.com' },
    update: {},
    create: {
      email: 'admin@amahoroluxury.com',
      password: 'Amahoro2026!', // In production, this should be hashed
    },
  });
  console.log('✅ Admin user created');

  console.log('🏁 Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
