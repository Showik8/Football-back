import type { Request, Response } from "express";
import { players } from "../constants";

function getPlayerId(req: Request, res: Response) {
  const ID = Number(req.params.id);
  const foundedPlayer = players.find((p) => p.id == ID);
  res.send(foundedPlayer);
}

export { getPlayerId };
