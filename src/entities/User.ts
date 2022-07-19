// ! Criando e exportando o Usuario
export class User {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public cpf_or_cnpj: string,
    public age: string
  ) {}
}