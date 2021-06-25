import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).end();
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(
      token,
      "3c5a1a89c5333a5c477c5f643417131edded6916e663c8aef31994d979909710"
    ) as IPayload;

    request.user_id = sub;
    return next();
  } catch (error) {
    return response.status(401).end();
  }
}
