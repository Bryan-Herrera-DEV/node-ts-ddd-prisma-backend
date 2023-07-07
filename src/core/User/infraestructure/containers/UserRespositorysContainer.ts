import { PrismaUserRepository } from "@/core/User/infraestructure/repositorys/PrismaUserRepository";
import { SaveUser } from "../../application/repositoryImplementations/SaveUser";
import { FindUser } from "../../application/repositoryImplementations/FindUser";
import { PrismaProvider } from "@/main/providers/PrismaProvider";

const repository = PrismaUserRepository(PrismaProvider);

export const UserRespositorysContainer = {
  saveUserImp: SaveUser(repository),
  findUserImp: FindUser(repository)
};
