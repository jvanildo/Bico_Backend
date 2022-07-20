// * Importando o metodo ROUTER do express
import { Router } from "express";

// ! Codigos
import { createUserController } from "./useCases/UserCase/CreateUser";
import { UserRopsitory } from "./repositories/implementations/UserRepository/UserRopsitory";
const router = Router(); // variavel com as rotas

// * ROTAS
// ? Rota de Criação de usuario
router.post('/user', async (req, res) => {
  return await createUserController.handle(req, res)
})
router.post('/login', async (req, res)=>{
  return await UserRopsitory.handle(req, res)
})

// rota de verificação de e-mail

// ! Exportando as rotas para o app
export { router }