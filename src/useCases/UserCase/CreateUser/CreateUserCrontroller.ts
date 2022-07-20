import { Request, response, Response } from "express";
import { userRopsitory } from '../../../repositories/implementations/UserRepository';
import { UserRopsitory } from '../../../repositories/implementations/UserRepository/UserRopsitory';
import { CreateUser } from "./CreateUser";
import nodemailer from 'nodemailer'
import crypto from 'crypto'

export class CreateUserController {
  constructor(
    private createUser: CreateUser
  ) {}

  async handle(req: Request, res: Response ) {
    const { name, email, password, cpf_or_cnpj, age } = req.body
  
    try {
      if(!name || !email || !password || !cpf_or_cnpj || !age) throw new Error("Informações incorretas")
      
      const user = await this.createUser.execute({
        name,
        email: email.toLowerCase(),
        password: password.toLowerCase(),
        cpf_or_cnpj,
        age
      })


      return res.json(user)
      
    } catch (error) {
      return res.json({
        error: error.message || "Unexpected error."
      })
    }
  }
}
export class login {
  constructor(
    private userRopsitory: UserRopsitory
  ) {}

  async handle(req: Request, res: Response ) {
    const { email } = req.body
  
    try {
      
      const user = await this.userRopsitory.findByEmail(email)
      if (user) throw new Error('Emaill já Cadastrado por outro usuario')
      return res.json(user)
      
    } catch (error) {
      return res.json({
        error: error.message || "Unexpected error."
      })
    }
  }
}
export class forgotPassword {
  constructor(
    private userRopsitory: UserRopsitory
  ) {}
  async handle(req: Request, res: Response ) {
    const {email} = req.body
  
    try {
      if( email!='' ) throw new Error("Informações incorretas")
      
      const user = await this.userRopsitory.forgotPassword(email)


      return res.json(user)
      
    } catch (error) {
      return res.json({
        error: error.message || "Unexpected error."
      })
    }
  }
}