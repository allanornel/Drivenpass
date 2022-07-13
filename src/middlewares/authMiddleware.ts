import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export async function validateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "").trim();
  const secretKey = process.env.SECRET_KEY;

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const user = jwt.verify(token, secretKey);
    if (!user) {
      return res.status(401);
    }
    res.locals.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
