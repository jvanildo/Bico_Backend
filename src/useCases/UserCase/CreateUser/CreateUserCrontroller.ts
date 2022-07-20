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
    const { email } = req.body
  
    try {
      
      const user = await this.userRopsitory.findByEmail(email)
      
      const transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "b3b45e071826af",
            pass: "da4413dbcba5c6"
          }
      })
      const newPassword = crypto.randomBytes(4).toString('hex')

      transporter.sendMail({
        from: 'Administrador <5038d7f65b-c23004+1@inbox.mailtrap.io>',
        to: email,
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
      return res.json({
        error: error.message || "Unexpected error."
      })
    }
  }
}