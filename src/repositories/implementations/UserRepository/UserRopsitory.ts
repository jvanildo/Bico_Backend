import { User } from "../../../entities/User";
import { IUserRepository } from "../../IUserRepository";

import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";


export class UserRopsitory implements IUserRepository {
  private prisma: PrismaClient = new PrismaClient();
  private crypt: Function = hash;


  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      }
    });

    return user;
  }

  async findByUser(id: number): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where:{
        id:id
      }
    })
    return user;
  }

  async save(user: User): Promise<User> {
    const result = await this.prisma.user.create({
      data: user,
    });

    return result;
  }

  async encryptpass(password: string): Promise<string> {
    const result = await this.crypt(password, 1);

    return result;
  }

}
