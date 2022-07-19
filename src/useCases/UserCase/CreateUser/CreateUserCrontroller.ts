import { Request, Response } from "express";
import { CreateUser } from "./CreateUser";

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