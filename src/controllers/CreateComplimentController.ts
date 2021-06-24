import { Request, Response } from "express";
import { CreateComplimentService } from "../services/CreateComplimentService";

class CreateComplimentController {
  async handle(request: Request, response: Response) {
    const { user_sender, user_receiver, message, tag_id } = request.body;

    const createComplimentService = new CreateComplimentService();
    const compliment = await createComplimentService.execute({
      user_sender,
      user_receiver,
      message,
      tag_id,
    });

    return response.json(compliment);
  }
}

export { CreateComplimentController };
