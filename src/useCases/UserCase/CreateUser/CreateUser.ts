import { User } from "../../../entities/User";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { ICreateUserDTO } from "./ICreateUserDTO";
import nodemailer from 'nodemailer'
import crypto from 'crypto'
import { UserRopsitory } from '../../../repositories/implementations/UserRepository/UserRopsitory';
import { response } from 'express';

export class CreateUser {
  constructor(
    public userRepository: IUserRepository
  ) {}

  async execute(data: ICreateUserDTO) {
    const userAlereadyExists = await this.userRepository.findByEmail(data.email)
    if (userAlereadyExists) throw new Error('Email Já Cadastrado por outro usuario.')

    const user = new User(
      data.name,
      data.email,
      await this.userRepository.encryptpass(data.password),
      await this.userRepository.encryptpass(data.cpf_or_cnpj),
      data.age
    ) 

    const result = await this.userRepository.save(user)

    return result
  }

  

  }

