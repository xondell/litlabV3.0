const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);

  const user = await prisma.user.upsert({
    where: { email: 'admin@litlab.local' },
    update: {},
    create: {
      email: 'admin@litlab.local',
      name: 'System Admin',
      password: hashedPassword,
    },
  });

  const booksData = [
    {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      publishedYear: 1925,
      coverUrl: null,
      descEn: 'A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.',
      isPublic: true,
      userId: user.id,
    },
    {
      title: '1984',
      author: 'George Orwell',
      publishedYear: 1949,
      coverUrl: null,
      descEn: 'A dystopian social science fiction novel and cautionary tale about the dangers of totalitarianism.',
      isPublic: true,
      userId: user.id,
    },
    {
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      publishedYear: 1960,
      coverUrl: null,
      descEn: 'A novel about the serious issues of rape and racial inequality, told through the eyes of a child.',
      isPublic: true,
      userId: user.id,
    },
    {
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      publishedYear: 1813,
      coverUrl: null,
      descEn: 'An romantic novel of manners that follows the character development of Elizabeth Bennet.',
      isPublic: true,
      userId: user.id,
    }
  ];

  for (const book of booksData) {
    await prisma.book.create({
      data: book,
    });
  }

  console.log('Seed completed successfully. Added 4 public books.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
