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
      nightlyRate: 500,
      depositPercent: 50,
    },
  })
  console.log({ settings })

  // Seed Admin (password should ideally be hashed, but for initial seed we might use a placeholder or handle hashing if bcrypt is available)
  // Since we don't know the hashing strategy from the schema alone, we'll just insert a string.
  // Note: ensure the login logic handles this or you update it later.
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@amahoroluxuryvilla.com' },
    update: {},
    create: {
      email: 'admin@amahoroluxuryvilla.com',
      password: 'adminpassword123', // SECURITY WARNING: Change this immediately
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
