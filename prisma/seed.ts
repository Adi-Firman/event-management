import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        email: "organizer@test.com",
        password: "123456", // sebaiknya hash di production
        role: "organizer",
        name: "Event Organizer",
      },
      {
        email: "customer@test.com",
        password: "123456",
        role: "customer",
        name: "Regular Customer",
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Dummy users created!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
