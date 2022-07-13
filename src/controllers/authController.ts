import { Request, Response } from "express";
import { CreateUserData } from "../repositories/authRepository.js";
import * as authService from "./../services/authService.js";

export async function signUp(req: Request, res: Response) {
  const userData: CreateUserData = req.body;
  await authService.signUpService(userData);
  res.sendStatus(201);
}

export async function signIn(req: Request, res: Response) {}
