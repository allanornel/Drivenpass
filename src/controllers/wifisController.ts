import { Request, Response } from "express";
import { CreateWifiData } from "../repositories/wifiRepository.js";
import { UserToken } from "../services/credentialsService.js";
import {
  createWifiService,
  deleteWifiService,
  getWifisService,
} from "../services/wifisService.js";

export async function createWifi(req: Request, res: Response) {
  const wifiData: CreateWifiData = req.body;
  const user: UserToken = res.locals.user;
  await createWifiService(wifiData, user);
  res.sendStatus(201);
}

export async function getWifis(req: Request, res: Response) {
  const user: UserToken = res.locals.user;
  let id;
  if (req.query && req.query.id) {
    id = (req.query as any).id;
  }
  if (id) {
    const wifi = await getWifisService(user, parseInt(id));
    res.status(200).send(wifi);
  } else {
    const wifis = await getWifisService(user);
    res.status(200).send(wifis);
  }
}
export async function deleteWifi(req: Request, res: Response) {
  const user: UserToken = res.locals.user;
  const { id } = req.params;
  await deleteWifiService(user, parseInt(id));
  res.sendStatus(200);
}
