import { User } from "../../../entities/User";
import { IUserRepository } from "../../IUserRepository";

import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { Request, Response } from 'express-serve-static-core';
import { ParsedQs } from 'qs';


export class UserRopsitory implements IUserRepository {
  static update(id: any, arg1: { password: any; }) {
    throw new Error('Method not implemented.');
  }
  static handle(req: Request<{}, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>, number>): void | PromiseLike<void> {
    throw new Error('Method not implemented.');
  }
  handle(req: Request<{}, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>, number>): void | PromiseLike<void> {
    throw new Error('Method not implemented.');
  }
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
