import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const events = [
    {
      name: "Tech Conference 2025",
      description: "Konferensi teknologi terbesar di Asia Tenggara.",
      location: "Jakarta",
      category: "Teknologi",
      price: 150000,
      startDate: new Date("2025-05-10T09:00:00Z"),
      endDate: new Date("2025-05-10T17:00:00Z"),
      availableSeat: 200,
      image: "https://example.com/images/event1.jpg",
      organizerId: "user1",
    },
    {
      name: "Music Fest 2025",
      description: "Festival musik selama 3 hari penuh hiburan.",
      location: "Bandung",
      category: "Musik",
      price: 250000,
      startDate: new Date("2025-06-01T12:00:00Z"),
      endDate: new Date("2025-06-03T23:00:00Z"),
      availableSeat: 500,
      image: "https://example.com/images/event2.jpg",
      organizerId: "user1",
    },
    {
      name: "Startup Pitch Day",
      description: "Ajang startup pitching dengan investor.",
      location: "Surabaya",
      category: "Bisnis",
      price: 100000,
      startDate: new Date("2025-07-12T10:00:00Z"),
      endDate: new Date("2025-07-12T16:00:00Z"),
      availableSeat: 100,
      image: "https://example.com/images/event3.jpg",
      organizerId: "user2",
    },
    {
      name: "Art Expo 2025",
      description: "Pameran seni lukis dan instalasi modern.",
      location: "Yogyakarta",
      category: "Seni",
      price: 50000,
      startDate: new Date("2025-08-05T09:00:00Z"),
      endDate: new Date("2025-08-10T18:00:00Z"),
      availableSeat: 150,
      image: "https://example.com/images/event4.jpg",
      organizerId: "user2",
    },
    {
      name: "Marathon 10K",
      description: "Event lari 10 kilometer untuk umum.",
      location: "Denpasar",
      category: "Olahraga",
      price: 75000,
      startDate: new Date("2025-09-20T06:00:00Z"),
      endDate: new Date("2025-09-20T12:00:00Z"),
      availableSeat: 1000,
      image: "https://example.com/images/event5.jpg",
      organizerId: "user3",
    },
    {
      name: "Culinary Fest",
      description: "Festival kuliner nusantara dan internasional.",
      location: "Semarang",
      category: "Kuliner",
      price: 60000,
      startDate: new Date("2025-10-01T10:00:00Z"),
      endDate: new Date("2025-10-03T22:00:00Z"),
      availableSeat: 400,
      image: "https://example.com/images/event6.jpg",
      organizerId: "user3",
    },
    {
      name: "Workshop UI/UX",
      description: "Workshop intensif desain UI dan UX.",
      location: "Jakarta",
      category: "Desain",
      price: 120000,
      startDate: new Date("2025-07-25T09:00:00Z"),
      endDate: new Date("2025-07-25T17:00:00Z"),
      availableSeat: 50,
      image: "https://example.com/images/event7.jpg",
      organizerId: "user1",
    },
    {
      name: "Movie Screening: Indie Film",
      description: "Pemutaran film indie karya anak bangsa.",
      location: "Bogor",
      category: "Film",
      price: 40000,
      startDate: new Date("2025-08-18T19:00:00Z"),
      endDate: new Date("2025-08-18T21:00:00Z"),
      availableSeat: 80,
      image: "https://example.com/images/event8.jpg",
      organizerId: "user2",
    },
    {
      name: "Photography Bootcamp",
      description: "Belajar fotografi langsung dari ahlinya.",
      location: "Malang",
      category: "Fotografi",
      price: 110000,
      startDate: new Date("2025-09-10T08:00:00Z"),
      endDate: new Date("2025-09-11T16:00:00Z"),
      availableSeat: 60,
      image: "https://example.com/images/event9.jpg",
      organizerId: "user3",
    },
    {
      name: "Coding Hackathon",
      description: "Hackathon 24 jam untuk developer pemula & expert.",
      location: "Jakarta",
      category: "Teknologi",
      price: 0,
      startDate: new Date("2025-11-15T08:00:00Z"),
      endDate: new Date("2025-11-16T08:00:00Z"),
      availableSeat: 300,
      image: "https://example.com/images/event10.jpg",
      organizerId: "user1",
    },
  ]
  

  await prisma.event.createMany({ data: events })

  console.log('✅ Dummy events berhasil ditambahkan!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
