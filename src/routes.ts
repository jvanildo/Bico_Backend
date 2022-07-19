// * Importando o metodo ROUTER do express
import { Router } from "express";

// ! Codigos
import { createUserController } from "./useCases/UserCase/CreateUser";

const router = Router(); // variavel com as rotas

// * ROTAS
// ? Rota de Criação de usuario
router.post('/user', async (req, res) => {
  return await createUserController.handle(req, res)
})

// ! Exportando as rotas para o app
export { router }