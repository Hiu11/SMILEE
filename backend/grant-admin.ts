import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const email = 'cinesky.cinema11@gmail.com';
  
  try {
    const user = await prisma.user.update({
      where: { email },
      data: { role: 'ADMIN' }
    });
    console.log(`Successfully updated user ${user.email} to role: ${user.role}`);
  } catch (error) {
    console.error('Error updating user. They might not exist in the database yet:', error);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
