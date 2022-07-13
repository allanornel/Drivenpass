import {
  CreateUserData,
  findByEmail,
  insert,
} from "../repositories/authRepository.js";
import bcrypt from "bcrypt";

const salt = 10;

export async function signUpService(userData: CreateUserData) {
  const checkEmail = await findByEmail(userData.email);
  if (checkEmail)
    throw {
      type: "User with this email already exists",
      message: "Email já cadastrado",
      statusCode: 422,
    };

  userData.password = await bcrypt.hash(userData.password, salt);
  await insert(userData);
}

export async function signInService() {}
