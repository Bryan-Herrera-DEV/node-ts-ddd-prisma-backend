import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "@/core/User/domain/IUserRepository";
import { v4 as uuidv4 } from "uuid";

export const PrismaUserRepository = (
  client: PrismaClient
): IUserRepository => ({
  async save(user) {
    const nUser = client.user.create({
      data: {
        id: uuidv4(),
        name: user.name || "default name",
        email: user.email || "default email",
        lastname: user.lastname || "default lasname",
        password: user.password || "default password",
        createdAt: user.createdAt.toISOString() || new Date().toISOString(),
        updatedAt: user.updatedAt.toISOString() || new Date().toISOString(),
      },
    });
    return nUser;
  },
});
