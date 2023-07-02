import { PrismaClient } from "@prisma/client";

let prisma;

beforeAll(async () => {
  prisma = new PrismaClient();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Database connection", () => {
  test("should connect without error", async () => {
    const isConnected = await prisma.$connect()
      .then(() => true)
      .catch(() => false);
    expect(isConnected).toBe(true);
  });
});
