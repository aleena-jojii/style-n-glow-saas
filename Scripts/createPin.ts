import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const pin = await prisma.pin.create({
    data: {
      title: "Summer Dress",
      imageUrl: "https://example.com/dress.jpg",
      category: "Fashion",
      // optional, since default is 0
      userId: "4a2336c4-0e9b-430a-941a-b40d49414fd3", // ✅ comma added here
      // affiliateUrl: "https://affiliate.example.com/product" // optional if made nullable
    },
  });

  console.log("✅ Pin created successfully:");
  console.log(pin);
}

main()
  .catch((error) => {
    console.error("❌ Error creating pin:", error);
  })
  .finally(() => {
    prisma.$disconnect();
  });