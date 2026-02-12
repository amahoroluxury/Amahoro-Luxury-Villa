import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding ...')

  // Seed Settings
  const settings = await prisma.settings.upsert({
    where: { id: 'site-settings' },
    update: {},
    create: {
      id: 'site-settings',
      nightlyRate: 200,
      depositPercent: 50,
    },
  })
  console.log({ settings })

  // Seed Admin (password now hashed)
  const bcrypt = require('bcryptjs');
  const hashedPassword = bcrypt.hashSync('adminpassword123', 10);

  const admin = await prisma.admin.upsert({
    where: { email: 'admin@amahoroluxuryvilla.com' },
    update: {},
    create: {
      email: 'admin@amahoroluxuryvilla.com',
      password: hashedPassword,
    },
  })
  console.log({ admin })

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
