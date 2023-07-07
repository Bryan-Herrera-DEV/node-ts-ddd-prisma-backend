import { PrismaUserRepository } from "@/core/User/infraestructure/repositorys/PrismaUserRepository";
import { PrismaClient, Prisma } from "@prisma/client";

// Mocking uuidv4()
jest.mock("uuid", () => ({
  v4: jest.fn(() => "abc123")
}));

describe("PrismaUserRepository", () => {
  let client: PrismaClient;
  let userRepository;

  beforeEach(() => {
    // Mocking PrismaClient
    client = {
      user: {
        create: jest.fn(),
      },
    } as unknown as PrismaClient;

    userRepository = PrismaUserRepository(client);
  });

  it("should call PrismaClient.user.create with correct data", async () => {
    const mockUser = {
      name: "test",
      email: "test@test.com",
      lastname: "test lastname",
      password: "test password",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const expectedCreateArgs: Prisma.UserCreateArgs = {
      data: {
        id: "abc123",
        name: mockUser.name,
        email: mockUser.email,
        lastname: mockUser.lastname,
        password: mockUser.password,
        createdAt: mockUser.createdAt.toISOString(),
        updatedAt: mockUser.updatedAt.toISOString(),
      },
    };

    await userRepository.save(mockUser);

    expect(client.user.create).toHaveBeenCalledWith(expectedCreateArgs);
  });

  it("should call PrismaClient.user.create with invalid data", async () => {
    const invalidCriteria = [{ invalid: "invalid" }];

    await expect(userRepository.find(invalidCriteria)).rejects.toThrowError(
      "Invalid input: criteria must be an array of Filters"
    );
  });
});
