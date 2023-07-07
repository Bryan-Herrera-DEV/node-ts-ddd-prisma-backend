import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "@/core/User/domain/IUserRepository";
import { v4 as uuidv4 } from "uuid";
import { Filter, operatorEnum } from "@/shared/Types/IFilter";
import { IUserBase } from "../../domain/IUser";

export const PrismaUserRepository = (
  client: PrismaClient
): IUserRepository => ({
  async save(user) {
    const nUser = client.user.create({
      data: {
        id: uuidv4(),
        name: user.name,
        email: user.email,
        lastname: user.lastname,
        password: user.password,
        createdAt: user.createdAt.toISOString() || new Date().toISOString(),
        updatedAt: user.updatedAt.toISOString() || new Date().toISOString(),
      },
    });
    return nUser;
  },
  async find(criteria) {
    if (!Array.isArray(criteria) || !criteria.every(isFilter)) {
      throw new Error("Invalid input: criteria must be an array of Filters");
    }
    const traking = await client.user.findFirst({
      where: criteriaConverter(criteria),
    });
    return traking;
  },
});

const isFilter = (obj: Filter<IUserBase>): obj is Filter<IUserBase> =>
  typeof obj === "object" &&
  obj !== null &&
  typeof obj.field === "string" &&
  typeof obj.value === "string" &&
  (obj.operator === operatorEnum.EQUAL);

const criteriaConverter = (criteria: Filter<IUserBase>[]) => {
  return criteria.reduce(
    (acc, filter) => ({
      ...acc,
      [filter.field]: filter.value,
    }),
    {}
  );
};
