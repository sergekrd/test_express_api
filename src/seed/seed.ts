import { enum_gender, PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function seed() {
  try {
    for (let i = 0; i < 300; i++) {
      const user = await prisma.users.create({
        data: {
          first_name: faker.person.firstName(),
          last_name: faker.person.lastName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          gender: faker.person.sex() as enum_gender,
          image_name: "5d1fa227-09d4-4669-8679-92d18f74e8dd.jpg"
        }
      });
    }
    console.log('Seed completed successfully');
  } catch (error) {
    console.error('Seed failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
