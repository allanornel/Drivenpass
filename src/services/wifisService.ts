import { wifis } from "@prisma/client";
import {
  CreateWifiData,
  deleteById,
  findById,
  findByTitleAndUserId,
  findByUserId,
  insert,
} from "../repositories/wifiRepository.js";
import { UserToken } from "./credentialsService.js";
import dotenv from "dotenv";
import Cryptr from "cryptr";
dotenv.config();

const cryptr = new Cryptr(process.env.SECRET_KEY);

export async function createWifiService(
  wifiData: CreateWifiData,
  user: UserToken
) {
  const { title, password } = wifiData;
  const verifTitle = await findByTitleAndUserId(title, user.id);
  if (verifTitle)
    throw {
      type: "Wi-fi with this title already exists",
      message: "Titulo já cadastrado para esse usuário",
      statusCode: 422,
    };
  wifiData.password = cryptr.encrypt(password);
  await insert(wifiData, user.id);
}
export async function getWifisService(user: UserToken, id?: number) {
  if (id) {
    const wifi = await findWifiById(id);
    checkUserId(wifi, user.id);
    return { ...wifi, password: cryptr.decrypt(wifi.password) };
  } else {
    let wifis = await findByUserId(user.id);
    wifis = wifis.map((w) => {
      return { ...w, password: cryptr.decrypt(w.password) };
    });
    return wifis;
  }
}

export async function deleteWifiService(user: UserToken, id: number) {
  const wifi = await findWifiById(id);
  checkUserId(wifi, user.id);
  await deleteById(id);
}

async function findWifiById(id: number) {
  const wifi = await findById(id);
  if (!wifi)
    throw {
      type: "Wifi not found",
      message: "Wi-fi não foi encontrado!",
      statusCode: 404,
    };
  return wifi;
}

function checkUserId(wifi: wifis, userId: number) {
  if (wifi.userId !== userId)
    throw {
      type: "Unathourized",
      message: "Wi-fi não pertence ao usuário!",
      statusCode: 401,
    };
}
