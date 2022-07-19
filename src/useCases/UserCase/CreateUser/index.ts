
import { userRopsitory } from "../../../repositories/implementations/UserRepository";
import { CreateUser } from "./CreateUser";
import { CreateUserController } from "./CreateUserCrontroller";

const createUser = new CreateUser(userRopsitory)
const createUserController = new CreateUserController(createUser)

export { createUser, createUserController }