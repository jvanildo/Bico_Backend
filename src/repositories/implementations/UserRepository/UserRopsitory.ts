import { User } from "../../../entities/User";
import { IUserRepository } from "../../IUserRepository";
import nodemailer from 'nodemailer'
import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { Request, Response } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import crypto from 'crypto';
import { ICreateUserDTO } from '../../../useCases/UserCase/CreateUser/ICreateUserDTO';
import { response } from 'express';


export class UserRopsitory implements IUserRepository {
  userRopsitory: any;
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

  async crypto () {
    const Password = crypto.randomBytes(4).toString('hex')
    return Password; 
  }

  async forgotPassword(email:ICreateUserDTO){  
    try {
      
      const user = await email
      
      const transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "b3b45e071826af",
            pass: "da4413dbcba5c6"
          }
      })
      const newPassword = await this.userRopsitory.crypto()

      transporter.sendMail({
        from: 'Administrador <5038d7f65b-c23004+1@inbox.mailtrap.io>',
        to: email.email,
        subject: 'Recuperação de Senha!',
        html: `<p>Olá, sua nova senha para acessar o sistema é : ${newPassword}<p><br/><a href="AQUI O LINK DO SISTEMA">Sistema<a/>`

      }).then(
        ()=>{
          password =>{
          UserRopsitory.update(user[0].id, {
            password
          }).then(
            () => {
              return response.status(200).json({message: 'Email sended'})
            }
          ).catch(
            () => {
              return response.status(404).json({message: 'User not found'})
            }
          )
        }
      }
      ).catch(
        () => {
          return response.status(404).json({message: 'Fail to send email'})
        }
      )
      
    } catch (error) {
      return error.json({
        error: error.message || "Unexpected error."
      })
    }
  }

}
