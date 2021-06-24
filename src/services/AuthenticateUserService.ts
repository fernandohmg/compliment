import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepository);

    const user = await usersRepositories.findOne({ email });

    if (!user) {
      throw new Error("Email/Password incorrect");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email/Password incorrect");
    }

    const token = sign(
      { email: user.email },
      "3c5a1a89c5333a5c477c5f643417131edded6916e663c8aef31994d979909710",
      { subject: user.id, expiresIn: "1d" }
    );

    return token;
  }
}

export { AuthenticateUserService };
