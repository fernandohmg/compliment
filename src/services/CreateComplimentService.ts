import { getCustomRepository } from "typeorm";
import { ComplimentsRepository } from "../repositories/ComplimentsRepository";
import { UsersRepository } from "../repositories/UsersRepository";

interface IComplimentRequest {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

class CreateComplimentService {
  async execute({
    tag_id,
    user_sender,
    user_receiver,
    message,
  }: IComplimentRequest) {
    const complimentRepository = getCustomRepository(ComplimentsRepository);
    const usersRepository = getCustomRepository(UsersRepository);

    if (user_sender === user_receiver) {
      throw new Error("User receiver and user sender are the same");
    }

    const userReceiverExists = await usersRepository.findOne(user_receiver);

    if (!userReceiverExists) {
      throw new Error("User receiver does not exists");
    }

    const compliment = complimentRepository.create({
      tag_id,
      user_receiver,
      user_sender,
      message,
    });

    await complimentRepository.save(compliment);

    return compliment;
  }
}

export { CreateComplimentService };
